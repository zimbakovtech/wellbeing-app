import { cn } from '../../lib/utils.js'

/**
 * Surface card. `interactive` adds a gentle hover lift for clickable cards.
 */
export default function Card({ children, className, interactive = false, ...props }) {
  return (
    <div
      className={cn(
        'card p-6 sm:p-7',
        interactive &&
          'transition-all duration-300 ease-gentle hover:-translate-y-1 hover:shadow-lift hover:border-line-strong',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
