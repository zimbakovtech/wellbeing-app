import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useReducedMotion } from 'framer-motion'
import ChartTooltip from './ChartTooltip.jsx'

const PALETTE = ['#6E9E84', '#9FBAD8', '#C58A6A'] // thriving · coping · struggling

/** Donut with a centred headline figure. data = [{ name, value }]. */
export default function DonutChartView({ data, centerValue, centerLabel, unit = '%', height = 220 }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="64%"
            outerRadius="92%"
            paddingAngle={2}
            stroke="none"
            isAnimationActive={!reduce}
            animationDuration={700}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip unit={unit} />} />
        </PieChart>
      </ResponsiveContainer>
      {centerValue != null && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl text-ink">{centerValue}</span>
          {centerLabel && (
            <span className="mt-0.5 text-2xs font-semibold uppercase tracking-wide text-ink-faint">
              {centerLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export { PALETTE as DONUT_PALETTE }
