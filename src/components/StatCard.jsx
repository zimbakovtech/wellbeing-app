import Icon from './ui/Icon.jsx'

/** Compact summary metric used in the Home stat strip. */
export default function StatCard({ value, label, sub, icon }) {
  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-sm">
      {icon && (
        <span className="mb-3 inline-grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
          <Icon name={icon} className="h-5 w-5" />
        </span>
      )}
      <p className="font-display text-3xl leading-none text-ink sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm font-medium text-ink-soft">{label}</p>
      {sub && <p className="mt-1 text-xs text-ink-muted">{sub}</p>}
    </div>
  )
}
