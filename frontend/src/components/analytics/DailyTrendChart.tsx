import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { ChartContainer } from '@/components/ui'
import { EmptyState } from '@/components/ui'
import { colors, chartColors } from '@/lib/theme'
import { TrendingUp } from 'lucide-react'

// TODO: replace with real shape once /analytics/daily defines its schema
export interface DailyDataPoint {
  date: string
  count: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="card-base px-3 py-2 text-xs"
      style={{ minWidth: 120 }}
    >
      <p className="font-medium mb-1" style={{ color: colors.textSecondary }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: chartColors[0] }}>
          {p.value} articles
        </p>
      ))}
    </div>
  )
}

interface DailyTrendChartProps {
  data: DailyDataPoint[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
}

export function DailyTrendChart({ data, isLoading, isError, onRetry }: DailyTrendChartProps) {
  return (
    <ChartContainer
      title="Daily Article Volume"
      description="Number of articles published per day"
      isLoading={isLoading}
      isError={isError}
      onRetry={onRetry}
      height={260}
    >
      {data.length === 0 ? (
        <EmptyState
          icon={<TrendingUp className="h-10 w-10" aria-hidden />}
          title="No trend data yet"
          description="Daily volume will appear once the analytics endpoint returns data"
          className="py-8"
        />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: colors.textMuted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: colors.textMuted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: colors.border }} />
            <Legend
              wrapperStyle={{ fontSize: 12, color: colors.textSecondary }}
              iconType="circle"
              iconSize={8}
            />
            <Line
              type="monotone"
              dataKey="count"
              name="Articles"
              stroke={chartColors[0]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: chartColors[0] }}
              animationDuration={600}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  )
}
