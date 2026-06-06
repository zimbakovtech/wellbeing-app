/** On-brand Recharts tooltip. Compact, rounded, soft shadow. */
export default function ChartTooltip({ active, payload, label, unit = '', valueLabel }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rounded-xl border border-line bg-surface/95 px-3.5 py-2.5 shadow-lift backdrop-blur-sm">
      {label != null && (
        <p className="mb-1 text-2xs font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      )}
      <ul className="space-y-1">
        {payload.map((entry, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color || entry.payload?.fill }}
              aria-hidden="true"
            />
            <span className="text-ink-muted">{valueLabel || entry.name}</span>
            <span className="ml-auto font-semibold tabular-nums text-ink">
              {entry.value}
              {unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
