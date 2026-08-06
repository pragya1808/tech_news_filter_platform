import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import { ChartContainer } from '@/components/ui'
import { EmptyState } from '@/components/ui'
import { colors, chartColors } from '@/lib/theme'
import { PieChart as PieIcon } from 'lucide-react'

export interface SourceDataPoint {
  name: string
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; payload: SourceDataPoint }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="card-base px-3 py-2 text-xs" style={{ minWidth: 130 }}>
      <p className="font-medium" style={{ color: colors.textPrimary }}>{item.name}</p>
      <p style={{ color: colors.textSecondary }}>{item.value} articles</p>
    </div>
  )
}

interface SourcePieChartProps {
  data: SourceDataPoint[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
}

export function SourcePieChart({ data, isLoading, isError, onRetry }: SourcePieChartProps) {
  return (
    <ChartContainer
      title="Articles by Source"
      description="Distribution across news sources"
      isLoading={isLoading}
      isError={isError}
      onRetry={onRetry}
      height={260}
    >
      {data.length === 0 ? (
        <EmptyState
          icon={<PieIcon className="h-10 w-10" aria-hidden />}
          title="No source data yet"
          description="Source distribution will appear once analytics data is available"
          className="py-8"
        />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="70%"
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={600}
              animationEasing="ease-out"
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={chartColors[i % chartColors.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11, color: colors.textSecondary }}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  )
}
