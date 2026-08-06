import { useState, useCallback, useEffect } from 'react'
import { FileSearch, Newspaper } from 'lucide-react'
import { useArticleFilters } from '@/hooks/useArticleFilters'
import { useArticlesPage } from '@/hooks/useArticlesPage'
import { Pagination, EmptyState, ErrorState } from '@/components/ui'
import {
  ArticleFullCard,
  ArticleGridSkeleton,
  ArticlesToolbar,
  ArticlesPageHeader,
} from '@/components/articles'
import type { SortOrder } from '@/hooks/useArticleFilters'

const GRID_SKELETON_COUNT = 9

export default function ArticlesPage() {
  const { filters, setFilters, clearFilters, hasActiveFilters } = useArticleFilters()
  const {
    articles,
    pagination,
    isLoading,
    isFetching,
    isError,
    refetch,
    topicsQuery,
    sourcesQuery,
    isSearching,
  } = useArticlesPage(filters)

  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)

  // Track last successful fetch time
  useEffect(() => {
    if (!isLoading && !isError && articles.length >= 0) {
      setLastRefreshed(new Date())
    }
  }, [isLoading, isError, articles.length])

  const handleRefresh = useCallback(() => {
    refetch()
    setLastRefreshed(new Date())
  }, [refetch])

  const handleSearch = useCallback(
    (q: string) => setFilters({  q }),
    [setFilters],
  )

  const handleTopicChange = useCallback(
    (topic: string) => setFilters({ topic }),
    [setFilters],
  )

  const handleSourceChange = useCallback(
    (source: string) => setFilters({ source }),
    [setFilters],
  )

  const handleSortChange = useCallback(
    (sort: SortOrder) => setFilters({ sort }),
    [setFilters],
  )

  const handlePageChange = useCallback(
    (skip: number) => setFilters({ skip }),
    [setFilters],
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <ArticlesPageHeader
        total={pagination.total}
        lastRefreshed={lastRefreshed}
        isFetching={isFetching && !isLoading}
        onRefresh={handleRefresh}
      />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Search + filters */}
      <ArticlesToolbar
        filters={filters}
        topics={topicsQuery.data ?? []}
        sources={sourcesQuery.data ?? []}
        isSearchLoading={isSearching && isFetching}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={handleSearch}
        onTopicChange={handleTopicChange}
        onSourceChange={handleSourceChange}
        onSortChange={handleSortChange}
        onClearFilters={clearFilters}
      />

      {/* Results area */}
      <section aria-label="Articles list" aria-live="polite" aria-busy={isLoading}>
        {/* Loading */}
        {isLoading && <ArticleGridSkeleton count={GRID_SKELETON_COUNT} />}

        {/* Error */}
        {!isLoading && isError && (
          <ErrorState
            title="Failed to load articles"
            message="Check your connection or try again"
            onRetry={handleRefresh}
          />
        )}

        {/* Empty — no articles at all */}
        {!isLoading && !isError && articles.length === 0 && !hasActiveFilters && !isSearching && (
          <EmptyState
            icon={<Newspaper className="h-12 w-12" aria-hidden />}
            title="No articles yet"
            description="Articles will appear here once the pipeline processes some content."
          />
        )}

        {/* Empty — search returned nothing */}
        {!isLoading && !isError && articles.length === 0 && isSearching && (
          <EmptyState
            icon={<FileSearch className="h-12 w-12" aria-hidden />}
            title="No results for that search"
            description={`Try different keywords or clear the search to browse all articles.`}
            action={
              <button
                onClick={() => setFilters({ q: '' })}
                className="text-sm transition-colors"
                style={{ color: 'var(--color-brand)' }}
              >
                Clear search
              </button>
            }
          />
        )}

        {/* Empty — filters returned nothing */}
        {!isLoading && !isError && articles.length === 0 && hasActiveFilters && !isSearching && (
          <EmptyState
            icon={<FileSearch className="h-12 w-12" aria-hidden />}
            title="No articles match those filters"
            description="Try adjusting the topic or source filter."
            action={
              <button
                onClick={clearFilters}
                className="text-sm transition-colors"
                style={{ color: 'var(--color-brand)' }}
              >
                Clear filters
              </button>
            }
          />
        )}

        {/* Grid */}
        {!isLoading && !isError && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map(article => (
              <ArticleFullCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {!isLoading && !isError && pagination.total > pagination.limit && (
        <Pagination
          total={pagination.total}
          skip={pagination.skip}
          limit={pagination.limit}
          onPageChange={handlePageChange}
          className="pt-2"
        />
      )}
    </div>
  )
}
