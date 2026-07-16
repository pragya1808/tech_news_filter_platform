import { RefreshCw } from 'lucide-react'
import { ArticleCard } from './ArticleCard'
import { ArticleCardSkeleton } from './ArticleCardSkeleton'
import { EmptyState, ErrorState } from '@/components/ui'
import type { ArticleResponse } from '@/types'

interface LatestArticlesFeedProps {
  articles: ArticleResponse[] | undefined
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

const CARD_LIMIT = 8

export function LatestArticlesFeed({
  articles,
  isLoading,
  isError,
  onRetry,
}: LatestArticlesFeedProps) {
  return (
    <section aria-labelledby="latest-articles-heading">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            id="latest-articles-heading"
            className="text-base font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Latest Articles
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
            Most recently published tech news
          </p>
        </div>
        {!isLoading && !isError && (
          <button
            onClick={onRetry}
            aria-label="Refresh articles"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-base"
            style={{
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            Refresh
          </button>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: CARD_LIMIT }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <ErrorState
          title="Failed to load articles"
          message="Check your connection or try again"
          onRetry={onRetry}
        />
      )}

      {!isLoading && !isError && (!articles || articles.length === 0) && (
        <EmptyState
          title="No articles yet"
          description="Articles will appear here once the pipeline runs"
        />
      )}

      {!isLoading && !isError && articles && articles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.slice(0, CARD_LIMIT).map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  )
}
