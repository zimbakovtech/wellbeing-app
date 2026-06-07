import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Section, SectionHeading } from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Pill from '../components/ui/Pill.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import RecommendationCard from '../components/RecommendationCard.jsx'
import { RECOMMENDATIONS, PRACTICES } from '../data/recommendations.js'
import { DIMENSIONS } from '../data/questions.js'
import { ACCENT } from '../data/topics.js'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function Resources() {
  const { t, pick } = useI18n()
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all', label: t('resources.all') },
    ...Object.entries(DIMENSIONS).map(([id, d]) => ({ id, label: pick(d.label), accent: d.accent })),
  ]
  const list = filter === 'all' ? RECOMMENDATIONS : RECOMMENDATIONS.filter((r) => r.dimension === filter)

  return (
    <>
      {/* Header */}
      <section className="container-page pt-12 sm:pt-16">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            {t('resources.eyebrow')}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 max-w-2xl text-balance text-4xl leading-[1.08] sm:text-5xl">{t('resources.title')}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">{t('resources.lead')}</p>
        </Reveal>
      </section>

      {/* Breathing feature */}
      <Section className="pt-10 sm:pt-12">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-ink p-8 text-paper sm:p-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
                <Icon name="Wind" className="h-4 w-4" />
                {t('resources.breathing.eyebrow')}
              </span>
              <h2 className="mt-4 font-display text-3xl leading-snug text-paper">{t('resources.breathing.title')}</h2>
              <p className="mt-3 max-w-md leading-relaxed text-paper/70">{t('resources.breathing.lead')}</p>
            </div>
            <BreathingExercise />
          </div>
        </Reveal>
      </Section>

      {/* Micro-practices */}
      <Section className="pt-0">
        <SectionHeading eyebrow={t('resources.practices.eyebrow')} title={t('resources.practices.title')} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRACTICES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className="card h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 font-display text-lg text-ink">{pick(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pick(p.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Recommendation library */}
      <Section className="pt-0">
        <SectionHeading eyebrow={t('resources.library.eyebrow')} title={t('resources.library.title')} lead={t('resources.library.lead')} />

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filters.map((f) => (
            <Pill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)} dotColor={f.accent ? ACCENT[f.accent].hex : undefined}>
              {f.label}
            </Pill>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <RecommendationCard rec={r} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* Support reminder */}
      <Section className="pt-0">
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Icon name="HeartHandshake" className="h-6 w-6" />
              </span>
              <div className="max-w-xl">
                <h3 className="font-display text-xl text-ink">{t('resources.support.title')}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{t('resources.support.lead')}</p>
              </div>
            </div>
            <Button
              href="https://www.who.int/health-topics/adolescent-health"
              variant="secondary"
              iconRight="ArrowUpRight"
              className="shrink-0"
              target="_blank"
              rel="noreferrer"
            >
              {t('common.findSupport')}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}

/* Calm breathing orb - inhale as it grows, exhale as it shrinks (4s each). */
function BreathingExercise() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const [phase, setPhase] = useState('ready')

  useEffect(() => {
    if (!active || reduce) return
    setPhase('in')
    const id = setInterval(() => setPhase((p) => (p === 'in' ? 'out' : 'in')), 4000)
    return () => clearInterval(id)
  }, [active, reduce])

  const label = phase === 'ready' ? t('resources.breathing.ready') : t(`resources.breathing.${phase}`)
  const pulse =
    active && !reduce
      ? { duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
      : { duration: 0.4 }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative grid h-56 w-56 place-items-center">
        <motion.div
          className="absolute h-44 w-44 rounded-full bg-blue-400/20 blur-xl"
          animate={active && !reduce ? { scale: [1, 1.35] } : { scale: 1 }}
          transition={pulse}
        />
        <motion.div
          className="grid h-36 w-36 place-items-center rounded-full border border-white/15 bg-gradient-to-b from-blue-400/40 to-blue-500/20"
          animate={active && !reduce ? { scale: [1, 1.28] } : { scale: 1 }}
          transition={pulse}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="px-2 text-center text-sm font-medium text-paper"
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      <button
        onClick={() => setActive((v) => !v)}
        className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-white/10"
      >
        <Icon name={active ? 'X' : 'Wind'} className="h-4 w-4" />
        {active ? t('resources.breathing.stop') : t('resources.breathing.start')}
      </button>
    </div>
  )
}
