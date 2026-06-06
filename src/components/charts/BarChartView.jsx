import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useReducedMotion } from 'framer-motion'
import ChartTooltip from './ChartTooltip.jsx'

const AXIS = { fontSize: 12, fill: '#9AA0AB' }

// Stable gender colours so the reader learns them across topics.
const GIRLS = '#4F79AC'
const BOYS = '#B7C0CC'

/** Grouped bars comparing Girls vs Boys for one topic across ages. */
export default function BarChartView({ data, height = 240 }) {
  const reduce = useReducedMotion()
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barGap={6}>
          <CartesianGrid stroke="#ECEAE4" vertical={false} />
          <XAxis dataKey="age" tick={AXIS} tickLine={false} axisLine={false} dy={6} />
          <YAxis domain={[0, 100]} tick={AXIS} tickLine={false} axisLine={false} width={44} />
          <Tooltip
            cursor={{ fill: 'rgba(27,30,36,0.03)' }}
            content={<ChartTooltip />}
          />
          <Legend
            iconType="circle"
            iconSize={9}
            wrapperStyle={{ fontSize: 13, color: '#6A707C', paddingTop: 8 }}
          />
          <Bar dataKey="Girls" fill={GIRLS} radius={[6, 6, 0, 0]} maxBarSize={34} isAnimationActive={!reduce} />
          <Bar dataKey="Boys" fill={BOYS} radius={[6, 6, 0, 0]} maxBarSize={34} isAnimationActive={!reduce} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
