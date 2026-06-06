import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useReducedMotion } from 'framer-motion'
import ChartTooltip from './ChartTooltip.jsx'

/**
 * Wellbeing profile across themes. Accepts data of { topic, value } and an
 * optional second comparison series (e.g. average) via `compare`.
 */
export default function RadarChartView({
  data,
  color = '#4F79AC',
  name = 'Wellbeing index',
  compare = null,
  height = 300,
}) {
  const reduce = useReducedMotion()
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%" margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <PolarGrid stroke="#E4E2DB" />
          <PolarAngleAxis
            dataKey="topic"
            tick={{ fontSize: 12, fill: '#6A707C' }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} tickCount={5} />
          {compare && (
            <Radar
              name={compare.name}
              dataKey={compare.dataKey}
              stroke="#C7CCD4"
              fill="#C7CCD4"
              fillOpacity={0.15}
              strokeWidth={1.5}
              isAnimationActive={!reduce}
            />
          )}
          <Radar
            name={name}
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.18}
            strokeWidth={2}
            isAnimationActive={!reduce}
            animationDuration={700}
          />
          <Tooltip content={<ChartTooltip valueLabel={name} />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
