import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import ChartCard from '../components/charts/ChartCard.jsx'
import LineChartView from '../components/charts/LineChartView.jsx'
import DonutChartView, { DONUT_PALETTE } from '../components/charts/DonutChartView.jsx'
import { TOPICS, TOPIC_MAP, ACCENT } from '../data/topics.js'
import { getDistribution } from '../data/datasets.js'

export default function TopicDetail() {
  const { topicId } = useParams()
  const topic = TOPIC_MAP[topicId]

  const index = TOPICS.findIndex((t) => t.id === topicId)
  const prev = index > 0 ? TOPICS[index - 1] : TOPICS[TOPICS.length - 1]
  const next = index < TOPICS.length - 1 ? TOPICS[index + 1] : TOPICS[0]

  const rawTrend = useMemo(() => {
    if (!topic) return []
    return Object.entries(topic.raw.series).map(([age, value]) => ({ name: `Age ${age}`, value }))
  }, [topic])

  const distribution = useMemo(
    () => (topic ? getDistribution(topic.id, 'all', 15) : []),
    [topic],
  )

  if (!topic) return <UnknownTopic id={topicId} />

  const accent = ACCENT[topic.accent]
  const isPercent = topic.raw.unit === '%'
  const maxRaw = Math.max(...Object.values(topic.raw.series), topic.raw.reference?.value ?? 0)
  const domain = isPercent ? [0, 100] : [0, Math.ceil(maxRaw + 1)]
  const thriving = distribution[0]?.value

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="absolute inset-0 -z-10 opacity-[0.5]"
          style={{
            background: `radial-gradient(60% 80% at 15% 0%, ${accent.hex}1F 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <nav className="flex items-center gap-1.5 text-sm text-ink-muted" aria-label="Breadcrumb">
              <Link to="/topics" className="hover:text-ink">Topics</Link>
              <Icon name="ChevronRight" className="h-3.5 w-3.5 text-ink-faint" />
              <span className="text-ink">{topic.name}</span>
            </nav>
          </Reveal>

          <div className="mt-6 flex items-start gap-4">
            <Reveal>
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
                style={{ backgroundColor: `${accent.hex}1F`, color: accent.hex }}
              >
                <Icon name={topic.icon} className="h-7 w-7" strokeWidth={1.8} />
              </span>
            </Reveal>
            <div>
              <Reveal>
                <h1 className="text-balance text-4xl leading-[1.05] sm:text-5xl">{topic.name}</h1>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-2 max-w-xl text-lg italic text-ink-muted">{topic.tagline}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Overview + why */}
      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-8">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl text-ink">The overview</h2>
                <p className="mt-3 text-lg leading-relaxed text-ink-soft text-pretty">{topic.overview}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="flex items-center gap-2 font-display text-xl text-ink">
                  <Icon name="Sparkles" className="h-5 w-5" style={{ color: accent.hex }} />
                  Why it matters for young people
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{topic.why}</p>
              </div>
            </Reveal>
          </div>

          {/* Headline stat */}
          <Reveal delay={0.08}>
            <div className="card flex h-full flex-col justify-center p-8 text-center">
              <p className="font-display text-6xl leading-none" style={{ color: accent.hex }}>
                {topic.stat.value}
              </p>
              <p className="mt-4 text-base font-medium text-ink">{topic.stat.label}</p>
              <p className="mt-1 text-sm text-ink-muted">{topic.stat.sub}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Charts */}
      <section className="container-page pb-4">
        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <ChartCard
              title={topic.raw.label}
              description="How this measure changes across the HBSC age groups (11, 13, 15)."
              takeaway={topic.insight}
              className="h-full"
            >
              <LineChartView
                data={rawTrend}
                color={accent.hex}
                unit={topic.raw.unit}
                valueLabel={topic.raw.label}
                domain={domain}
                reference={topic.raw.reference}
                height={260}
              />
            </ChartCard>
          </Reveal>

          <Reveal delay={0.08}>
            <ChartCard
              title="At age 15"
              description="A simulated split of how young people are faring on this theme."
              className="h-full"
            >
              <DonutChartView
                data={distribution}
                centerValue={`${thriving}%`}
                centerLabel="thriving"
                unit="%"
                height={220}
              />
              <ul className="mt-4 space-y-1.5">
                {distribution.map((d, i) => (
                  <li key={d.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: DONUT_PALETTE[i] }}
                    />
                    <span className="text-ink-muted">{d.name}</span>
                    <span className="ml-auto font-semibold tabular-nums text-ink">{d.value}%</span>
                  </li>
                ))}
              </ul>
            </ChartCard>
          </Reveal>
        </div>
      </section>

      {/* Tips */}
      <section className="container-page py-12 sm:py-16">
        <SectionHeadingInline accent={accent.hex} title="Three things that help" />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {topic.tips.map((tip, i) => (
            <Reveal key={tip.title} delay={i * 0.08}>
              <div className="card h-full p-6">
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg font-display text-base"
                  style={{ backgroundColor: `${accent.hex}1A`, color: accent.hex }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{tip.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reflection + CTA */}
      <section className="container-page pb-16">
        <Reveal>
          <div
            className="overflow-hidden rounded-3xl border border-line p-8 sm:p-12"
            style={{ backgroundColor: `${accent.hex}0D` }}
          >
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  <Icon name="Quote" className="h-4 w-4" />
                  A moment to reflect
                </span>
                <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
                  {topic.reflection}
                </p>
                <p className="mt-3 text-ink-muted">
                  No right answer — just worth sitting with. The wellbeing check builds on
                  questions like this.
                </p>
              </div>
              <Button to="/check" size="lg" iconRight="ArrowRight" className="shrink-0">
                Continue to the check
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Prev / next */}
      <section className="border-t border-line">
        <div className="container-page grid gap-px sm:grid-cols-2">
          <TopicNavLink topic={prev} dir="prev" />
          <TopicNavLink topic={next} dir="next" />
        </div>
      </section>
    </>
  )
}

function UnknownTopic({ id }) {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="eyebrow justify-center">
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        Topic not found
      </span>
      <h1 className="mt-5 max-w-lg text-balance text-4xl leading-tight sm:text-5xl">
        We don’t have a deep dive for “{id}”.
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">
        It may have moved or never existed — here are the six themes we do cover.
      </p>
      <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-2.5 sm:max-w-xl sm:grid-cols-3">
        {TOPICS.map((t) => (
          <Link
            key={t.id}
            to={`/topics/${t.id}`}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
          >
            {t.name}
          </Link>
        ))}
      </div>
      <Button to="/topics" variant="ghost" icon="ArrowLeft" className="mt-6">
        All topics
      </Button>
    </section>
  )
}

function SectionHeadingInline({ title, accent }) {
  return (
    <Reveal>
      <h2 className="flex items-center gap-3 font-display text-2xl text-ink sm:text-3xl">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
        {title}
      </h2>
    </Reveal>
  )
}

function TopicNavLink({ topic, dir }) {
  const isNext = dir === 'next'
  return (
    <Link
      to={`/topics/${topic.id}`}
      className="group flex items-center gap-4 py-8 transition-colors hover:bg-surface sm:px-6"
      style={{ justifyContent: isNext ? 'flex-end' : 'flex-start' }}
    >
      {!isNext && (
        <Icon name="ArrowLeft" className="h-5 w-5 text-ink-faint transition-transform group-hover:-translate-x-1 group-hover:text-ink" />
      )}
      <span className={isNext ? 'text-right' : ''}>
        <span className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">
          {isNext ? 'Next theme' : 'Previous theme'}
        </span>
        <span className="block font-display text-lg text-ink">{topic.name}</span>
      </span>
      {isNext && (
        <Icon name="ArrowRight" className="h-5 w-5 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-ink" />
      )}
    </Link>
  )
}
