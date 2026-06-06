import { Section, SectionHeading } from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import TopicCard from '../components/TopicCard.jsx'
import Button from '../components/ui/Button.jsx'
import { TOPICS } from '../data/topics.js'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function Topics() {
  const { t, lp } = useI18n()
  return (
    <Section>
      <SectionHeading eyebrow={t('topics.eyebrow')} title={t('topics.title')} lead={t('topics.lead')} />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic, i) => (
          <Reveal key={topic.id} delay={(i % 3) * 0.07}>
            <TopicCard topic={topic} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6 text-center sm:flex-row sm:text-left">
          <p className="text-ink-muted">{t('topics.notSure')}</p>
          <Button to={lp('/check')} iconRight="ArrowRight" className="shrink-0">
            {t('common.takeCheck')}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
