import { cn } from '../../lib/utils.js'
import Icon from './Icon.jsx'

/** Filter pill — used for topic selection. Dot/icon optional. */
export default function Pill({ active, onClick, children, icon, dotColor, className }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium',
        'transition-all duration-200 ease-gentle',
        active
          ? 'border-ink bg-ink text-paper shadow-soft'
          : 'border-line bg-surface text-ink-soft hover:border-ink/25 hover:text-ink',
        className,
      )}
    >
      {dotColor && (
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      {icon && <Icon name={icon} className="h-4 w-4" />}
      {children}
    </button>
  )
}
