import { cn } from '../../lib/utils.js'
import Reveal from './Reveal.jsx'

/** Section heading block: optional eyebrow, display title and lead paragraph. */
export function SectionHeading({ eyebrow, title, lead, align = 'left', className }) {
  return (
    <div
      className={cn(
        'max-w-prose',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      {title && (
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-3xl leading-[1.1] text-balance sm:text-4xl">{title}</h2>
        </Reveal>
      )}
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted text-pretty">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}

/** Vertical rhythm wrapper for page sections. */
export function Section({ children, className, id }) {
  return (
    <section id={id} className={cn('py-16 sm:py-24', className)}>
      <div className="container-page">{children}</div>
    </section>
  )
}
