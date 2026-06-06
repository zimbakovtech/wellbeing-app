import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useReducedMotion } from 'framer-motion'
import ChartTooltip from './ChartTooltip.jsx'

const AXIS = { fontSize: 12, fill: '#9AA0AB' }

/**
 * Smooth area trend for a single series of { name, value } points.
 * Used for the explore trajectory and the deep-dive "raw" stats.
 */
export default function LineChartView({
  data,
  color = '#4F79AC',
  unit = '',
  valueLabel = 'Value',
  domain = [0, 100],
  reference = null,
  height = 240,
}) {
  const reduce = useReducedMotion()
  const gradId = `area-${color.replace('#', '')}`

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.22} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ECEAE4" vertical={false} />
          <XAxis dataKey="name" tick={AXIS} tickLine={false} axisLine={false} dy={6} />
          <YAxis
            domain={domain}
            tick={AXIS}
            tickLine={false}
            axisLine={false}
            width={44}
            unit={unit}
          />
          {reference && (
            <ReferenceLine
              y={reference.value}
              stroke="#9AA0AB"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: reference.label,
                position: 'insideTopRight',
                fill: '#9AA0AB',
                fontSize: 11,
              }}
            />
          )}
          <Tooltip
            cursor={{ stroke: '#DEDCD4', strokeWidth: 1 }}
            content={<ChartTooltip unit={unit} valueLabel={valueLabel} />}
          />
          <Area
            type="monotone"
            dataKey="value"
            name={valueLabel}
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            dot={{ r: 3.5, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
            isAnimationActive={!reduce}
            animationDuration={700}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
