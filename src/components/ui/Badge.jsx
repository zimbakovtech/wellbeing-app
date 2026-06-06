import { cn } from '../../lib/utils.js'

/** Small label chip. `tone="accent"` for the muted-blue variant. */
export default function Badge({ children, tone = 'neutral', className }) {
  const tones = {
    neutral: 'bg-paper text-ink-muted border border-line',
    accent: 'bg-blue-50 text-blue-700 border border-blue-100',
    ink: 'bg-ink text-paper',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-2xs font-semibold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
