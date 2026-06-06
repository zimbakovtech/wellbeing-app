import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils.js'

/**
 * Segmented control with a sliding indicator. Keyboard-friendly (radiogroup),
 * indicator animation respects reduced-motion.
 *
 * @param {{id:string,label:string}[]} options
 */
export default function SegmentedControl({ options, value, onChange, label, size = 'md' }) {
  const reduce = useReducedMotion()
  const pad = size === 'sm' ? 'p-0.5' : 'p-1'
  const cell = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm'

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('inline-flex rounded-full border border-line bg-paper', pad)}
    >
      {options.map((opt) => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.id)}
            className={cn(
              'relative cursor-pointer rounded-full font-medium transition-colors duration-200',
              cell,
              active ? 'text-ink' : 'text-ink-muted hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${label}`}
                className="absolute inset-0 rounded-full bg-surface shadow-soft"
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 380, damping: 32 }
                }
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
