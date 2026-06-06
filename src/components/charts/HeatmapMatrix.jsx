import { ACCENT } from '../../data/topics.js'

// Blue intensity scale. The numeric value is printed in every cell, so meaning
// never relies on colour alone (accessibility: color-not-only).
function cellStyle(value) {
  const alpha = 0.1 + (value / 100) * 0.82
  return {
    backgroundColor: `rgba(79, 121, 172, ${alpha})`,
    color: value >= 58 ? '#FFFFFF' : '#2E4661',
  }
}

/**
 * Topic × age wellbeing matrix. `rows` = output of getHeatmap(gender).
 */
export default function HeatmapMatrix({ rows, ages }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="min-w-[420px]">
        {/* Column headers */}
        <div className="grid grid-cols-[minmax(116px,1.4fr)_repeat(3,1fr)] gap-1.5 pb-1.5">
          <span className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">Theme</span>
          {ages.map((age) => (
            <span
              key={age}
              className="text-center text-2xs font-semibold uppercase tracking-wide text-ink-faint"
            >
              Age {age}
            </span>
          ))}
        </div>

        <div className="space-y-1.5">
          {rows.map((row) => (
            <div
              key={row.topicId}
              className="grid grid-cols-[minmax(116px,1.4fr)_repeat(3,1fr)] gap-1.5"
            >
              <div className="flex items-center gap-2 pr-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: ACCENT[row.topicId]?.hex }}
                  aria-hidden="true"
                />
                <span className="truncate text-sm font-medium text-ink-soft">{row.topic}</span>
              </div>
              {row.values.map(({ age, value }) => (
                <div
                  key={age}
                  title={`${row.topic}, age ${age}: wellbeing index ${value}/100`}
                  className="grid h-11 place-items-center rounded-lg text-sm font-semibold tabular-nums transition-transform duration-200 ease-gentle hover:scale-[1.05]"
                  style={cellStyle(value)}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-3 text-2xs text-ink-faint">
          <span>Lower</span>
          <span className="h-2 flex-1 rounded-full bg-gradient-to-r from-[rgba(79,121,172,0.12)] to-[rgba(79,121,172,0.92)]" />
          <span>Higher wellbeing</span>
        </div>
      </div>
    </div>
  )
}
