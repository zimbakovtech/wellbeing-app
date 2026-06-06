import { Section, SectionHeading } from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import TopicCard from '../components/TopicCard.jsx'
import Button from '../components/ui/Button.jsx'
import { TOPICS } from '../data/topics.js'

export default function Topics() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Topic deep dives"
        title="Six wellbeing themes, told as short stories"
        lead="Each deep dive turns a single theme into something readable — what it is, why it matters for young people, what the data shows, and a few things that genuinely help."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((t, i) => (
          <Reveal key={t.id} delay={(i % 3) * 0.07}>
            <TopicCard topic={t} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6 text-center sm:flex-row sm:text-left">
          <p className="text-ink-muted">
            <span className="font-medium text-ink">Not sure where to start?</span> The wellbeing
            check will point you to the themes most worth your attention.
          </p>
          <Button to="/check" iconRight="ArrowRight" className="shrink-0">
            Take the check
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
