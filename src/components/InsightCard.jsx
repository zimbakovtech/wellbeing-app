import Icon from './ui/Icon.jsx'
import { cn } from '../lib/utils.js'

/**
 * "What this means" insight panel - plain-language reading of the data.
 * `points` is an optional list of short supporting bullets.
 */
export default function InsightCard({ title = 'What this means', lead, points = [], className }) {
  return (
    <div className={cn('card flex h-full flex-col p-6 sm:p-7', className)}>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-paper">
          <Icon name="Sparkles" className="h-4 w-4" />
        </span>
        <h3 className="font-display text-xl text-ink">{title}</h3>
      </div>

      {lead && <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft text-pretty">{lead}</p>}

      {points.length > 0 && (
        <ul className="mt-4 space-y-3">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
              <Icon name="Check" className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
