import { Newspaper, Tag, Globe, CalendarDays } from 'lucide-react'
import { StatCard, CardSkeleton } from '@/components/ui'
import type {
  TopicResponse,
  ArticleResponse,
  StatsResponse,
} from '@/types'

interface KPIGridProps {
  stats: StatsResponse | undefined

  latestArticles?: ArticleResponse[]
  topics?: TopicResponse[]

  articlesToday: number
  totalSources: number

  isLoading: boolean
}

export function KPIGrid({
  stats,
  latestArticles,
  topics,
  articlesToday,
  totalSources,
  isLoading,
}: KPIGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        aria-label="KPI cards loading"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  // Prefer backend stats, fall back to derived values
  const articleCount =
    stats?.total_articles ??
    latestArticles?.length ??
    0

  const topicCount =
    stats?.total_topics ??
    topics?.length ??
    0

  const sourceCount =
    stats?.total_sources ??
    totalSources

  const todayCount =
    stats?.articles_today ??
    articlesToday

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
        value={sourceCount.toLocaleString()}
        icon={<Globe className="h-4 w-4" aria-hidden />}
      />

      <StatCard
        label="Published Today"
        value={todayCount.toLocaleString()}
        icon={<CalendarDays className="h-4 w-4" aria-hidden />}
      />
    </div>
  )
}