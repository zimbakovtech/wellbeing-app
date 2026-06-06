import Icon from './ui/Icon.jsx'
import { ACCENT } from '../data/topics.js'
import { cn } from '../lib/utils.js'

/** Recommendation card: title, blurb, an actionable step, and "why this helps". */
export default function RecommendationCard({ rec, className }) {
  const accent = ACCENT[rec.accent]
  return (
    <article
      className={cn(
        'card group flex h-full flex-col p-6 transition-all duration-300 ease-gentle hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      <span
        className="grid h-11 w-11 place-items-center rounded-xl"
        style={{ backgroundColor: `${accent.hex}1A`, color: accent.hex }}
      >
        <Icon name={rec.icon} className="h-5 w-5" strokeWidth={1.9} />
      </span>

      <h3 className="mt-5 font-display text-lg text-ink">{rec.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{rec.blurb}</p>

      <div className="mt-4 rounded-xl bg-paper p-3.5">
        <p className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">Try this</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{rec.action}</p>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
        <Icon name="Heart" className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: accent.hex }} />
        <span>
          <span className="font-semibold text-ink-soft">Why it helps · </span>
          {rec.why}
        </span>
      </p>
    </article>
  )
}
