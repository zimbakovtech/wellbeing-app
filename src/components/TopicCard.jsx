import { Link } from 'react-router-dom'
import Icon from './ui/Icon.jsx'
import { ACCENT } from '../data/topics.js'
import { cn } from '../lib/utils.js'

/** Topic teaser card — links to the deep dive. Used in grids on Home & Topics. */
export default function TopicCard({ topic, className }) {
  const accent = ACCENT[topic.accent]
  return (
    <Link
      to={`/topics/${topic.id}`}
      className={cn(
        'card group flex h-full flex-col p-6 transition-all duration-300 ease-gentle',
        'hover:-translate-y-1 hover:shadow-lift hover:border-line-strong',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ backgroundColor: `${accent.hex}1A`, color: accent.hex }}
        >
          <Icon name={topic.icon} className="h-5 w-5" strokeWidth={1.9} />
        </span>
        <Icon
          name="ArrowUpRight"
          className="h-5 w-5 text-ink-faint transition-all duration-300 ease-gentle group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        />
      </div>

      <h3 className="mt-5 font-display text-xl text-ink">{topic.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{topic.tagline}</p>

      <div className="mt-5 flex items-baseline gap-2 border-t border-line pt-4">
        <span className="font-display text-2xl text-ink" style={{ color: accent.hex }}>
          {topic.stat.value}
        </span>
        <span className="text-xs leading-snug text-ink-muted">{topic.stat.label}</span>
      </div>
    </Link>
  )
}
