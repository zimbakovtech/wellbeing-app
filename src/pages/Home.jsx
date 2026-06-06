import { Link } from 'react-router-dom'
import { Section, SectionHeading } from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import StatCard from '../components/StatCard.jsx'
import TopicCard from '../components/TopicCard.jsx'
import RadarChartView from '../components/charts/RadarChartView.jsx'
import { TOPICS } from '../data/topics.js'
import { getRadarProfile, getOverallIndex } from '../data/datasets.js'

const PILLARS = [
  {
    icon: 'Compass',
    title: 'See the patterns',
    body: 'Interactive charts reveal how sleep, stress and connection shift across the teenage years.',
  },
  {
    icon: 'Sparkles',
    title: 'Reflect honestly',
    body: 'A short, private wellbeing check turns the data inward — no scores shared, no judgement.',
  },
  {
    icon: 'Leaf',
    title: 'Act gently',
    body: 'Small, practical steps you can actually keep, matched to the areas that need care.',
  },
]

const JOURNEY = [
  { n: '01', title: 'Explore the data', body: 'Filter by age and gender to see how wellbeing themes move and where they dip.', to: '/explore', cta: 'Open the data' },
  { n: '02', title: 'Take the check', body: 'Answer ten quick questions and get a calm, personal wellbeing profile.', to: '/check', cta: 'Start the check' },
  { n: '03', title: 'Find what helps', body: 'Turn insight into action with practical, encouraging recommendations.', to: '/resources', cta: 'See resources' },
]

export default function Home() {
  const profile = getRadarProfile('all', 15)
  const overall = getOverallIndex('all', 15)

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="halo absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-page grid items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                A HBSC-inspired wellbeing experience
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-balance text-[2.6rem] font-medium leading-[1.04] tracking-tight sm:text-6xl">
                Understand youth wellbeing through data and{' '}
                <span className="italic text-blue-600">reflection</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">
                Explore the habits, pressures and supports that shape adolescent life — then turn
                what you learn into small, doable steps for your own wellbeing.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button to="/explore" size="lg" iconRight="ArrowRight">
                  Start exploring
                </Button>
                <Button to="/check" size="lg" variant="secondary" icon="ClipboardCheck">
                  Take the wellbeing check
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-6 flex items-center gap-2 text-sm text-ink-faint">
                <Icon name="ShieldCheck" className="h-4 w-4" />
                Private and reflective — nothing you enter ever leaves your device.
              </p>
            </Reveal>
          </div>

          {/* Snapshot card */}
          <Reveal delay={0.16}>
            <div className="card relative p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Wellbeing snapshot
                  </p>
                  <p className="mt-1 font-display text-lg text-ink">Across themes · age 15</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl leading-none text-ink">{overall}</p>
                  <p className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">
                    overall index
                  </p>
                </div>
              </div>
              <RadarChartView data={profile} height={280} name="Wellbeing index" />
              <p className="mt-1 text-center text-xs text-ink-muted">
                Higher is better · simulated HBSC-style data
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- Stat strip */}
      <section className="border-y border-line bg-surface/50">
        <div className="container-page py-12">
          <Reveal>
            <p className="text-sm font-medium text-ink-muted">
              A few signals from the teenage years —{' '}
              <span className="text-ink">what the data keeps showing.</span>
            </p>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { value: '6.9h', label: 'Average sleep at 15', sub: 'down from 8.4h at age 11', icon: 'Moon' },
              { value: '46%', label: 'Feel pressured by school', sub: 'by age 15', icon: 'HeartPulse' },
              { value: '1 in 5', label: 'Meet activity guidelines', sub: 'at age 15', icon: 'Footprints' },
              { value: '28%', label: 'Often feel lonely', sub: 'rising through the teens', icon: 'Users' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <StatCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Why it matters */}
      <Section>
        <SectionHeading
          eyebrow="Why it matters"
          title="Adolescence is where lifelong habits and feelings take shape."
          lead="The teenage years bring more independence, more pressure and more screens. Small things — sleep, movement, who you can talk to — add up to how a young person feels day to day."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------- HBSC explainer */}
      <Section className="pt-0">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line bg-ink text-paper">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1px_1fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
                  <Icon name="BookOpen" className="h-4 w-4" />
                  About HBSC
                </span>
                <h2 className="mt-4 font-display text-2xl leading-snug text-paper sm:text-3xl">
                  Inspired by the Health Behaviour in School-aged Children study.
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-paper/70">
                  HBSC is a long-running, WHO-collaborative survey that asks young people aged 11,
                  13 and 15 about their health, habits and relationships across dozens of
                  countries. It’s one of the richest pictures we have of how adolescents are really
                  doing.
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/70">
                  This project reimagines those themes as a calm, interactive experience. The
                  figures here are simulated for learning, but the patterns they show are true to
                  what the research finds.
                </p>
              </div>

              <div className="hidden bg-white/10 lg:block" aria-hidden="true" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                  What you can do here
                </p>
                <ul className="mt-5 space-y-5">
                  {[
                    { icon: 'Compass', t: 'Explore', d: 'Filter wellbeing data by age and gender.' },
                    { icon: 'ClipboardCheck', t: 'Reflect', d: 'Take a private, ten-question wellbeing check.' },
                    { icon: 'LifeBuoy', t: 'Act', d: 'Get practical steps matched to what you need.' },
                  ].map((item) => (
                    <li key={item.t} className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-200">
                        <Icon name={item.icon} className="h-5 w-5" />
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

      {/* -------------------------------------------------- Topic grid */}
      <Section className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="The themes"
            title="Six threads of wellbeing"
            lead="Each one is a short, readable deep dive — what it means, why it matters, and what helps."
          />
          <Reveal>
            <Button to="/topics" variant="ghost" iconRight="ArrowRight" className="hidden sm:inline-flex">
              All topics
            </Button>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.07}>
              <TopicCard topic={t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------- Journey */}
      <Section className="pt-0">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From data, to reflection, to action"
          className="mx-auto"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {JOURNEY.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div className="card flex h-full flex-col p-7">
                <span className="font-display text-3xl text-line-strong">{step.n}</span>
                <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                <Link
                  to={step.to}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:gap-2.5 transition-all"
                >
                  {step.cta}
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------- Final CTA */}
      <Section className="pt-0">
        <Reveal>
          <div className="halo relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl leading-tight sm:text-4xl">
              Curious how your own week is going?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-ink-muted">
              Take the wellbeing check — it’s short, private, and surprisingly clarifying.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/check" size="lg" iconRight="ArrowRight">
                Take the wellbeing check
              </Button>
              <Button to="/explore" size="lg" variant="secondary">
                Explore the data first
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
