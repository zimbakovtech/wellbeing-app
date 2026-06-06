import { useMemo, useState } from 'react'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Pill from '../components/ui/Pill.jsx'
import SegmentedControl from '../components/ui/SegmentedControl.jsx'
import ChartCard from '../components/charts/ChartCard.jsx'
import LineChartView from '../components/charts/LineChartView.jsx'
import BarChartView from '../components/charts/BarChartView.jsx'
import RadarChartView from '../components/charts/RadarChartView.jsx'
import HeatmapMatrix from '../components/charts/HeatmapMatrix.jsx'
import InsightCard from '../components/InsightCard.jsx'
import Icon from '../components/ui/Icon.jsx'
import { TOPICS, TOPIC_MAP, ACCENT } from '../data/topics.js'
import {
  AGES,
  GENDERS,
  getAgeSeries,
  getGenderComparison,
  getRadarProfile,
  getHeatmap,
  getScore,
} from '../data/datasets.js'

const AGE_OPTIONS = AGES.map((a) => ({ id: String(a), label: String(a) }))

export default function Explore() {
  const [topicId, setTopicId] = useState('sleep')
  const [gender, setGender] = useState('all')
  const [age, setAge] = useState(15)

  const topic = TOPIC_MAP[topicId]
  const accent = ACCENT[topic.accent]
  const genderLabel = GENDERS.find((g) => g.id === gender).label

  const trend = useMemo(
    () => getAgeSeries(topicId, gender).map((d) => ({ name: d.age, value: d.value })),
    [topicId, gender],
  )
  const comparison = useMemo(() => getGenderComparison(topicId), [topicId])
  const radar = useMemo(() => getRadarProfile(gender, age), [gender, age])
  const heatmap = useMemo(() => getHeatmap(gender), [gender])

  // Dynamic, plain-language reading of the selected slice.
  const insight = useMemo(() => {
    const v11 = getScore(topicId, gender, 11)
    const v15 = getScore(topicId, gender, 15)
    const drop = v11 - v15
    const direction = drop > 0 ? 'falls' : drop < 0 ? 'rises' : 'holds steady'
    const girl = getScore(topicId, 'female', age)
    const boy = getScore(topicId, 'male', age)
    const gap = Math.abs(girl - boy)
    const higher = girl >= boy ? 'girls' : 'boys'
    return {
      lead: `${topic.insight} For ${genderLabel.toLowerCase()}, the ${topic.name.toLowerCase()} index ${direction} from ${v11} at age 11 to ${v15} at age 15.`,
      points: [
        `At age ${age}, ${higher} report a higher index — a gap of ${gap} points between girls and boys.`,
        `${topic.why}`,
        `Relatable figure: ${topic.raw.label.toLowerCase()} ${topic.raw.series[15]}${topic.raw.unit} by age 15.`,
      ],
    }
  }, [topicId, gender, age, topic, genderLabel])

  return (
    <>
      {/* Header */}
      <section className="container-page pb-2 pt-12 sm:pt-16">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            Explore the data
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 max-w-2xl text-balance text-4xl leading-[1.08] sm:text-5xl">
            How wellbeing shifts across the teenage years
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">
            Choose a theme, then filter by age and gender. Every chart updates together, and the
            panel on the right explains what you’re seeing in plain language.
          </p>
        </Reveal>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 mt-6 border-y border-line bg-paper/85 backdrop-blur-md sm:top-[4.5rem]">
        <div className="container-page py-4">
          {/* Topic pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="Topic">
            {TOPICS.map((t) => (
              <Pill
                key={t.id}
                active={t.id === topicId}
                onClick={() => setTopicId(t.id)}
                dotColor={ACCENT[t.accent].hex}
              >
                {t.name}
              </Pill>
            ))}
          </div>
          {/* Segmented filters */}
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">Age</span>
              <SegmentedControl
                label="Age"
                size="sm"
                options={AGE_OPTIONS}
                value={String(age)}
                onChange={(v) => setAge(Number(v))}
              />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">Group</span>
              <SegmentedControl label="Group" size="sm" options={GENDERS} value={gender} onChange={setGender} />
            </div>
            <span className="ml-auto hidden items-center gap-2 text-sm text-ink-muted sm:flex">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent.hex }} />
              {topic.metricLabel} · 0–100, higher is better
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Trend — spans full row top with insight beside it */}
          <Reveal className="lg:col-span-1">
            <ChartCard
              title={`${topic.name}: the trajectory from 11 to 15`}
              description={`${topic.metricLabel} for ${genderLabel.toLowerCase()}, across the three HBSC age groups.`}
              takeaway={topic.insight}
            >
              <LineChartView
                data={trend}
                color={accent.hex}
                valueLabel={topic.metricLabel}
                domain={[0, 100]}
              />
            </ChartCard>
          </Reveal>

          <Reveal delay={0.06}>
            <InsightCard lead={insight.lead} points={insight.points} className="h-full" />
          </Reveal>

          {/* Gender comparison */}
          <Reveal delay={0.04}>
            <ChartCard
              title="The gap between girls and boys"
              description="Grouped by age, so you can see where and when the difference widens."
              takeaway={`The boy–girl difference in ${topic.name.toLowerCase()} tends to widen with age.`}
            >
              <BarChartView data={comparison} />
            </ChartCard>
          </Reveal>

          {/* Radar profile */}
          <Reveal delay={0.1}>
            <ChartCard
              title="Wellbeing profile across themes"
              description={`Every theme at once for ${genderLabel.toLowerCase()}, age ${age}. A larger shape means higher wellbeing.`}
              takeaway="No single theme tells the whole story — wellbeing is the balance across all of them."
            >
              <RadarChartView data={radar} name="Wellbeing index" height={300} />
            </ChartCard>
          </Reveal>

          {/* Heatmap full width */}
          <Reveal delay={0.06} className="lg:col-span-2">
            <ChartCard
              title="Every theme, every age"
              description={`A wellbeing index matrix for ${genderLabel.toLowerCase()}. Darker means higher wellbeing.`}
              takeaway="Reading down the columns, most themes cool from age 11 to 15 — the adolescent dip the research consistently finds."
            >
              <HeatmapMatrix rows={heatmap} ages={AGES} />
            </ChartCard>
          </Reveal>
        </div>

        {/* Bridge to topic + check */}
        <Reveal>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{ backgroundColor: `${accent.hex}1A`, color: accent.hex }}
              >
                <Icon name={topic.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg text-ink">Go deeper on {topic.name.toLowerCase()}</p>
                <p className="text-sm text-ink-muted">Read the story behind the numbers and what helps.</p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <Button to={`/topics/${topic.id}`} variant="secondary" iconRight="ArrowRight">
                {topic.name} deep dive
              </Button>
              <Button to="/check" iconRight="ArrowRight">
                Wellbeing check
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
