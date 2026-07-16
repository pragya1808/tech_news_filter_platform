import { Newspaper, Tag, Globe, TrendingUp } from 'lucide-react'
import { StatCard, CardSkeleton } from '@/components/ui'
import type { AnalyticsKPIs } from '@/utils/analytics'

interface AnalyticsKPIGridProps {
  kpis: AnalyticsKPIs
  isLoading: boolean
}

export function AnalyticsKPIGrid({ kpis, isLoading }: AnalyticsKPIGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Analytics KPI cards loading">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      role="region"
      aria-label="Analytics overview"
    >
      <StatCard
        label="Total Articles"
        value={kpis.totalArticles.toLocaleString()}
        icon={<Newspaper className="h-4 w-4" aria-hidden />}
      />
      <StatCard
        label="Total Topics"
        value={kpis.totalTopics.toLocaleString()}
        icon={<Tag className="h-4 w-4" aria-hidden />}
      />
      <StatCard
        label="Total Sources"
        value={kpis.totalSources.toLocaleString()}
        icon={<Globe className="h-4 w-4" aria-hidden />}
      />
      <StatCard
        label="Avg / Day (14d)"
        value={kpis.avgPerDay.toLocaleString()}
        icon={<TrendingUp className="h-4 w-4" aria-hidden />}
      />
    </div>
  )
}
