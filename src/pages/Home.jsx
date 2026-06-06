import { Link } from 'react-router-dom'
import { Section, SectionHeading } from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import StatCard from '../components/StatCard.jsx'
import TopicCard from '../components/TopicCard.jsx'
import RadarChartView from '../components/charts/RadarChartView.jsx'
import { TOPICS, TOPIC_MAP } from '../data/topics.js'
import { getRadarProfile, getOverallIndex } from '../data/datasets.js'
import { useI18n } from '../i18n/I18nContext.jsx'

const PILLAR_ICONS = ['Compass', 'Sparkles', 'Leaf']
const HBSC_ICONS = ['Compass', 'ClipboardCheck', 'LifeBuoy']
const STAT_TOPICS = ['sleep', 'stress', 'activity', 'loneliness']
const JOURNEY = [
  { to: '/explore', icon: 'Compass' },
  { to: '/check', icon: 'ClipboardCheck' },
  { to: '/resources', icon: 'LifeBuoy' },
]

export default function Home() {
  const { t, pick, lp } = useI18n()
  const profile = getRadarProfile('all', 15).map((d) => ({ topic: pick(d.name), value: d.value }))
  const overall = getOverallIndex('all', 15)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="halo absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-page grid items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                {t('home.eyebrow')}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-balance text-[2.6rem] font-medium leading-[1.04] tracking-tight sm:text-6xl">
                {t('home.titleA')} <span className="italic text-blue-600">{t('home.titleHighlight')}</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">{t('home.lead')}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button to={lp('/explore')} size="lg" iconRight="ArrowRight">
                  {t('common.startExploring')}
                </Button>
                <Button to={lp('/check')} size="lg" variant="secondary" icon="ClipboardCheck">
                  {t('common.takeCheck')}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-6 flex items-center gap-2 text-sm text-ink-faint">
                <Icon name="ShieldCheck" className="h-4 w-4" />
                {t('home.privacy')}
              </p>
            </Reveal>
          </div>

          {/* Snapshot */}
          <Reveal delay={0.16}>
            <div className="card relative p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {t('home.snapshotTitle')}
                  </p>
                  <p className="mt-1 font-display text-lg text-ink">{t('home.snapshotSub')}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl leading-none text-ink">{overall}</p>
                  <p className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">
                    {t('home.overallIndex')}
                  </p>
                </div>
              </div>
              <RadarChartView data={profile} height={280} name={t('home.snapshotTitle')} />
              <p className="mt-1 text-center text-xs text-ink-muted">
                {t('common.higherBetter')} · {t('common.simulated')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-y border-line bg-surface/50">
        <div className="container-page py-12">
          <Reveal>
            <p className="text-sm font-medium text-ink-muted">{t('home.statsTitle')}</p>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STAT_TOPICS.map((id, i) => {
              const top = TOPIC_MAP[id]
              return (
                <Reveal key={id} delay={i * 0.06}>
                  <StatCard
                    value={pick(top.stat.value)}
                    label={pick(top.stat.label)}
                    sub={pick(top.stat.sub)}
                    icon={top.icon}
                  />
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <Section>
        <SectionHeading eyebrow={t('home.why.eyebrow')} title={t('home.why.title')} lead={t('home.why.lead')} />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {t('home.pillars').map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon name={PILLAR_ICONS[i]} className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HBSC explainer */}
      <Section className="pt-0">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line bg-ink text-paper">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1px_1fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
                  <Icon name="BookOpen" className="h-4 w-4" />
                  {t('home.hbsc.eyebrow')}
                </span>
                <h2 className="mt-4 font-display text-2xl leading-snug text-paper sm:text-3xl">
                  {t('home.hbsc.title')}
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-paper/70">{t('home.hbsc.body')}</p>
              </div>

              <div className="hidden bg-white/10 lg:block" aria-hidden="true" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                  {t('home.hbsc.doTitle')}
                </p>
                <ul className="mt-5 space-y-5">
                  {t('home.hbsc.do').map((item, i) => (
                    <li key={item.t} className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-200">
                        <Icon name={HBSC_ICONS[i]} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-display text-lg text-paper">{item.t}</p>
                        <p className="text-sm text-paper/65">{item.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Topic grid */}
      <Section className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={t('home.topics.eyebrow')} title={t('home.topics.title')} lead={t('home.topics.lead')} />
          <Reveal>
            <Button to={lp('/topics')} variant="ghost" iconRight="ArrowRight" className="hidden sm:inline-flex">
              {t('common.allTopics')}
            </Button>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic, i) => (
            <Reveal key={topic.id} delay={(i % 3) * 0.07}>
              <TopicCard topic={topic} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Journey */}
      <Section className="pt-0">
        <SectionHeading align="center" eyebrow={t('home.journey.eyebrow')} title={t('home.journey.title')} className="mx-auto" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t('home.journey.steps').map((step, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card flex h-full flex-col p-7">
                <span className="font-display text-3xl text-line-strong">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                <Link
                  to={lp(JOURNEY[i].to)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-all hover:gap-2.5"
                >
                  {step.cta}
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="pt-0">
        <Reveal>
          <div className="halo relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl leading-tight sm:text-4xl">
              {t('home.finalCta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-ink-muted">{t('home.finalCta.lead')}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to={lp('/check')} size="lg" iconRight="ArrowRight">
                {t('common.takeCheck')}
              </Button>
              <Button to={lp('/explore')} size="lg" variant="secondary">
                {t('common.exploreFirst')}
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
