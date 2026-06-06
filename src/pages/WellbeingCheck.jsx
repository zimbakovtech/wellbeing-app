import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import RadarChartView from '../components/charts/RadarChartView.jsx'
import RecommendationCard from '../components/RecommendationCard.jsx'
import { QUESTIONS } from '../data/questions.js'
import { scoreAssessment, TOTAL_QUESTIONS as TOTAL } from '../lib/scoring.js'
import { RECOMMENDATIONS } from '../data/recommendations.js'
import { ACCENT } from '../data/topics.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import { cn } from '../lib/utils.js'

const STAGE = { INTRO: 'intro', QUIZ: 'quiz', RESULT: 'result' }
const BULLET_ICONS = ['ClipboardCheck', 'ShieldCheck', 'Heart']

export default function WellbeingCheck() {
  const [stage, setStage] = useState(STAGE.INTRO)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState({})
  const reduce = useReducedMotion()

  const answeredCount = Object.keys(answers).length
  const progress = stage === STAGE.RESULT ? 100 : Math.round((answeredCount / TOTAL) * 100)

  function choose(qid, value) {
    setAnswers((a) => ({ ...a, [qid]: value }))
    if (step < TOTAL - 1) {
      setDir(1)
      setStep((s) => s + 1)
    } else {
      setStage(STAGE.RESULT)
    }
  }

  function back() {
    if (step === 0) return setStage(STAGE.INTRO)
    setDir(-1)
    setStep((s) => s - 1)
  }

  function restart() {
    setAnswers({})
    setStep(0)
    setDir(1)
    setStage(STAGE.INTRO)
  }

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 28 : -28 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -28 : 28 }),
  }
  const slide = reduce
    ? {}
    : { variants, initial: 'enter', animate: 'center', exit: 'exit', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        {stage === STAGE.INTRO && <Intro onStart={() => setStage(STAGE.QUIZ)} />}

        {stage === STAGE.QUIZ && (
          <div>
            <ProgressHeader step={step} progress={progress} onBack={back} />
            <div className="relative mt-8 min-h-[20rem]">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div key={step} custom={dir} {...slide}>
                  <QuestionView question={QUESTIONS[step]} selected={answers[QUESTIONS[step].id]} onChoose={choose} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {stage === STAGE.RESULT && <Result answers={answers} onRestart={restart} />}
      </div>
    </section>
  )
}

function Intro({ onStart }) {
  const { t } = useI18n()
  return (
    <Reveal>
      <div className="text-center">
        <span className="eyebrow justify-center">
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          {t('check.eyebrow')}
        </span>
        <h1 className="mx-auto mt-5 max-w-xl text-balance text-4xl leading-[1.08] sm:text-5xl">{t('check.introTitle')}</h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink-muted">{t('check.introLead')}</p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
          {t('check.bullets').map((item, i) => (
            <div key={item.t} className="flex items-center gap-3.5 rounded-2xl border border-line bg-surface px-5 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Icon name={BULLET_ICONS[i]} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-ink">{item.t}</p>
                <p className="text-sm text-ink-muted">{item.d}</p>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={onStart} size="lg" className="mt-8" iconRight="ArrowRight">
          {t('check.begin')}
        </Button>
      </div>
    </Reveal>
  )
}

function ProgressHeader({ step, progress, onBack }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  return (
    <div>
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink">
          <Icon name="ArrowLeft" className="h-4 w-4" />
          {t('common.back')}
        </button>
        <span className="text-sm font-medium tabular-nums text-ink-muted">
          {t('check.question')} {step + 1} <span className="text-ink-faint">/ {TOTAL}</span>
        </span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-ink"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

function QuestionView({ question, selected, onChoose }) {
  const { pick } = useI18n()
  return (
    <div>
      <h2 className="text-balance font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">{pick(question.text)}</h2>
      {question.help && <p className="mt-2 text-ink-muted">{pick(question.help)}</p>}

      <div className="mt-7 grid gap-3">
        {question.options.map((opt) => {
          const active = selected === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChoose(question.id, opt.value)}
              className={cn(
                'group flex cursor-pointer items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-200 ease-gentle',
                active ? 'border-ink bg-ink text-paper shadow-soft' : 'border-line bg-surface hover:border-ink/30 hover:bg-paper',
              )}
            >
              <span className={cn('font-medium', active ? 'text-paper' : 'text-ink')}>{pick(opt.label)}</span>
              <span
                className={cn(
                  'grid h-6 w-6 place-items-center rounded-full border transition-colors',
                  active ? 'border-paper bg-paper text-ink' : 'border-line-strong text-transparent group-hover:border-ink/40',
                )}
              >
                <Icon name="Check" className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Result({ answers, onRestart }) {
  const { t, pick, lp } = useI18n()
  const result = useMemo(() => scoreAssessment(answers), [answers])
  const radarData = result.dimensions.map((d) => ({ topic: pick(d.label), value: d.score }))

  const focusIds = new Set(result.focus.map((d) => d.id))
  const recs = useMemo(() => {
    const matched = RECOMMENDATIONS.filter((r) => focusIds.has(r.dimension))
    const perDim = {}
    const picked = []
    for (const r of matched) {
      perDim[r.dimension] = (perDim[r.dimension] || 0) + 1
      if (perDim[r.dimension] <= 2) picked.push(r)
      if (picked.length >= 3) break
    }
    return picked
  }, [result])

  return (
    <div>
      <Reveal>
        <div className="text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            {t('check.resultEyebrow')}
          </span>
          <h1 className="mt-5 font-display text-4xl text-ink sm:text-5xl">{t(`check.bands.${result.bandId}.title`)}</h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
            {t(`check.bands.${result.bandId}.message`)}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-10 grid gap-5 sm:grid-cols-[0.85fr_1.15fr]">
          <div className="card flex flex-col items-center justify-center p-7 text-center">
            <ScoreRing value={result.overall} />
            <p className="mt-4 text-sm font-medium text-ink-soft">{t('check.overallLabel')}</p>
            <p className="mt-1 text-xs text-ink-muted">{t('check.overallSub')}</p>
          </div>
          <div className="card p-6">
            <h3 className="font-display text-lg text-ink">{t('check.profileTitle')}</h3>
            <RadarChartView data={radarData} name={t('check.overallLabel')} height={260} />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="card mt-5 p-6 sm:p-7">
          <h3 className="font-display text-lg text-ink">{t('check.byTheme')}</h3>
          <div className="mt-5 space-y-4">
            {result.dimensions.map((d) => (
              <div key={d.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{pick(d.label)}</span>
                  <span className="font-semibold tabular-nums text-ink-soft">{d.score}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-gentle"
                    style={{ width: `${d.score}%`, backgroundColor: ACCENT[d.accent].hex }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {recs.length > 0 && (
        <Reveal delay={0.08}>
          <div className="mt-12">
            <h3 className="font-display text-2xl text-ink">{t('check.startTitle')}</h3>
            <p className="mt-2 max-w-xl text-ink-muted">
              {t('check.startLeadA')}{' '}
              <span className="text-ink">{result.focus.map((f) => pick(f.label).toLowerCase()).join(' · ')}</span>.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recs.map((r) => (
                <RecommendationCard key={r.id} rec={r} />
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <div className="mt-12 rounded-2xl border border-line bg-surface p-6 text-center">
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-ink-muted">{t('check.reassurance')}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button to={lp('/resources')} iconRight="ArrowRight">
              {t('common.exploreResources')}
            </Button>
            <Button onClick={onRestart} variant="secondary" icon="RotateCcw">
              {t('check.retake')}
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function ScoreRing({ value }) {
  const reduce = useReducedMotion()
  const r = 52
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#ECEAE4" strokeWidth="10" />
        <motion.circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="#4F79AC"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? false : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={reduce ? { duration: 0 } : { duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl leading-none text-ink">{value}</span>
        <span className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">/ 100</span>
      </div>
    </div>
  )
}
