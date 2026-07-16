import { Newspaper, Tag, Globe, CalendarDays } from 'lucide-react'
import { StatCard } from '@/components/ui'
import { CardSkeleton } from '@/components/ui'
import type { TopicResponse, ArticleResponse } from '@/types'

interface KPIGridProps {
  latestArticles: ArticleResponse[] | undefined
  topics: TopicResponse[] | undefined
  articlesToday: number
  totalSources: number
  isLoading: boolean
}

export function KPIGrid({
  latestArticles,
  topics,
  articlesToday,
  totalSources,
  isLoading,
}: KPIGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="KPI cards loading">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  const articleCount = latestArticles?.length ?? 0
  const topicCount = topics?.length ?? 0

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      role="region"
      aria-label="Key performance indicators"
    >
      <StatCard
        label="Total Articles"
        value={articleCount.toLocaleString()}
        icon={<Newspaper className="h-4 w-4" aria-hidden />}
      />
      <StatCard
        label="Total Topics"
        value={topicCount.toLocaleString()}
        icon={<Tag className="h-4 w-4" aria-hidden />}
      />
      <StatCard
        label="Total Sources"
        value={totalSources.toLocaleString()}
        icon={<Globe className="h-4 w-4" aria-hidden />}
      />
      <StatCard
        label="Published Today"
        value={articlesToday.toLocaleString()}
        icon={<CalendarDays className="h-4 w-4" aria-hidden />}
      />
    </div>
  )
}
