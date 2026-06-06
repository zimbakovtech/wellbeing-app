import { useMemo, useState } from 'react'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Pill from '../components/ui/Pill.jsx'
import SegmentedControl from '../components/ui/SegmentedControl.jsx'
import ChartCard from '../components/charts/ChartCard.jsx'
import LineChartView from '../components/charts/LineChartView.jsx'
import BarChartView from '../components/charts/BarChartView.jsx'
import RadarChartView from '../components/charts/RadarChartView.jsx'
import InsightCard from '../components/InsightCard.jsx'
import Icon from '../components/ui/Icon.jsx'
import { TOPICS, TOPIC_MAP, ACCENT } from '../data/topics.js'
import { GENDERS, getAgeSeries, getGenderComparison, getRadarProfile } from '../data/datasets.js'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function Explore() {
  const { t, pick, lp } = useI18n()
  const [topicId, setTopicId] = useState('sleep')
  const [gender, setGender] = useState('all')

  const topic = TOPIC_MAP[topicId]
  const accent = ACCENT[topic.accent]

  const genderOptions = GENDERS.map((g) => ({ id: g, label: t(`common.groups.${g}`) }))
  const barLabels = { girls: t('common.groups.female'), boys: t('common.groups.male') }

  const trend = useMemo(() => getAgeSeries(topicId, gender), [topicId, gender])
  const comparison = useMemo(() => getGenderComparison(topicId), [topicId])
  const radar = useMemo(
    () => getRadarProfile(gender, 15).map((d) => ({ topic: pick(d.name), value: d.value })),
    [gender, pick],
  )

  return (
    <>
      {/* Header */}
      <section className="container-page pb-2 pt-12 sm:pt-16">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            {t('explore.eyebrow')}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 max-w-2xl text-balance text-4xl leading-[1.08] sm:text-5xl">{t('explore.title')}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">{t('explore.lead')}</p>
        </Reveal>
      </section>

      {/* Sticky filter bar — one theme picker + one group toggle */}
      <div className="sticky top-16 z-30 mt-6 border-y border-line bg-paper/85 backdrop-blur-md sm:top-[4.5rem]">
        <div className="container-page py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label={t('nav.topics')}>
            {TOPICS.map((top) => (
              <Pill key={top.id} active={top.id === topicId} onClick={() => setTopicId(top.id)} dotColor={ACCENT[top.accent].hex}>
                {pick(top.name)}
              </Pill>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">
                {t('explore.groupLabel')}
              </span>
              <SegmentedControl label={t('explore.groupLabel')} size="sm" options={genderOptions} value={gender} onChange={setGender} />
            </div>
            <span className="ml-auto hidden items-center gap-2 text-sm text-ink-muted sm:flex">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent.hex }} />
              {pick(topic.metricLabel)} · {t('common.higherBetter')}
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <ChartCard title={t('explore.trend.title')} description={t('explore.trend.desc')} takeaway={pick(topic.insight)}>
              <LineChartView data={trend} color={accent.hex} valueLabel={pick(topic.metricLabel)} domain={[0, 100]} />
            </ChartCard>
          </Reveal>

          <Reveal delay={0.06}>
            <InsightCard title={t('explore.insightTitle')} lead={pick(topic.insight)} points={[pick(topic.why)]} className="h-full" />
          </Reveal>

          <Reveal delay={0.04}>
            <ChartCard title={t('explore.gap.title')} description={t('explore.gap.desc')} takeaway={t('explore.gap.takeaway')}>
              <BarChartView data={comparison} labels={barLabels} />
            </ChartCard>
          </Reveal>

          <Reveal delay={0.1}>
            <ChartCard title={t('explore.radar.title')} description={t('explore.radar.desc')} takeaway={t('explore.radar.takeaway')}>
              <RadarChartView data={radar} name={t('explore.radar.title')} height={300} />
            </ChartCard>
          </Reveal>
        </div>

        {/* Bridge */}
        <Reveal>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: `${accent.hex}1A`, color: accent.hex }}>
                <Icon name={topic.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg text-ink">{t('common.goDeeper')}</p>
                <p className="text-sm text-ink-muted">{t('common.goDeeperSub')}</p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <Button to={lp(`/topics/${topic.id}`)} variant="secondary" iconRight="ArrowRight">
                {pick(topic.name)}
              </Button>
              <Button to={lp('/check')} iconRight="ArrowRight">
                {t('nav.check')}
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
