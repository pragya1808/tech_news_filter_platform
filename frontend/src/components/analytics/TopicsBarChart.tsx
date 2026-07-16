import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { ChartContainer } from '@/components/ui'
import { EmptyState } from '@/components/ui'
import { colors, chartColors } from '@/lib/theme'
import { BarChart2 } from 'lucide-react'

export interface TopicDataPoint {
  name: string
  count: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="card-base px-3 py-2 text-xs" style={{ minWidth: 120 }}>
      <p className="font-medium mb-1" style={{ color: colors.textSecondary }}>{label}</p>
      <p style={{ color: chartColors[1] }}>{payload[0].value} articles</p>
    </div>
  )
}

interface TopicsBarChartProps {
  data: TopicDataPoint[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
}

export function TopicsBarChart({ data, isLoading, isError, onRetry }: TopicsBarChartProps) {
  return (
    <ChartContainer
      title="Articles by Topic"
      description="Top topics by article count"
      isLoading={isLoading}
      isError={isError}
      onRetry={onRetry}
      height={260}
    >
      {data.length === 0 ? (
        <EmptyState
          icon={<BarChart2 className="h-10 w-10" aria-hidden />}
          title="No topic data yet"
          description="Topic breakdown will appear once analytics data is available"
          className="py-8"
        />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
            <XAxis
              dataKey="name"
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              animationDuration={600}
              animationEasing="ease-out"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={chartColors[i % chartColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  )
}
