import Icon from '../ui/Icon.jsx'
import { cn } from '../../lib/utils.js'

/**
 * Consistent shell for every chart: title, short explanation, the chart itself,
 * and a plain-language takeaway. An aria-label carries the takeaway so screen
 * readers get the insight even though the SVG itself isn't readable.
 */
export default function ChartCard({ title, description, takeaway, children, aside, className }) {
  return (
    <figure className={cn('card flex flex-col p-6 sm:p-7', className)}>
      <figcaption>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl text-ink">{title}</h3>
            {description && (
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-muted">{description}</p>
            )}
          </div>
          {aside}
        </div>
      </figcaption>

      <div
        className="mt-6"
        role="img"
        aria-label={takeaway ? `${title}. ${takeaway}` : title}
      >
        {children}
      </div>

      {takeaway && (
        <p className="mt-5 flex items-start gap-2.5 border-t border-line pt-4 text-sm leading-relaxed text-ink-soft">
          <Icon name="Lightbulb" className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
          <span>
            <span className="font-semibold text-ink">Takeaway · </span>
            {takeaway}
          </span>
        </p>
      )}
    </figure>
  )
}
