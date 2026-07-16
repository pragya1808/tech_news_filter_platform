import { useMemo } from 'react'
import { useArticles, useSearchArticles } from './useArticles'
import { useTopics } from './useTopics'
import type { ArticleFilters, SortOrder } from './useArticleFilters'
import type { ArticleResponse } from '@/types'

function sortArticles(items: ArticleResponse[], sort: SortOrder): ArticleResponse[] {
  const copy = [...items]
  return copy.sort((a, b) => {
    const da = new Date(a.published_at ?? a.extracted_at).getTime()
    const db = new Date(b.published_at ?? b.extracted_at).getTime()
    return sort === 'newest' ? db - da : da - db
  })
}

export function useArticlesPage(filters: ArticleFilters) {
  const isSearching = filters.search.trim().length > 0

  // Browsing mode: GET /articles with topic + source filters
  const browseQuery = useArticles({
    topic: filters.topic || undefined,
    source: filters.source || undefined,
    skip: filters.skip,
    limit: filters.limit,
  })

  // Search mode: GET /articles/search (no server-side pagination total)
  const searchQuery = useSearchArticles({
    q: filters.search,
    skip: filters.skip,
    limit: filters.limit,
  })

  // Topic list for the filter dropdown
  const topicsQuery = useTopics()

  // Derive unique sources from the current browse page (no dedicated endpoint)
  const derivedSources = useMemo(() => {
    const items = browseQuery.data?.items ?? []
    return Array.from(new Set(items.map(a => a.source))).sort()
  }, [browseQuery.data])

  // Unified article list — apply client-side sort
  const articles = useMemo(() => {
    const raw = isSearching
      ? (searchQuery.data ?? [])
      : (browseQuery.data?.items ?? [])
    return sortArticles(raw, filters.sort)
  }, [isSearching, searchQuery.data, browseQuery.data, filters.sort])

  // Pagination meta — search endpoint has no total, so we estimate
  const pagination = useMemo(() => {
    if (isSearching) {
      const count = searchQuery.data?.length ?? 0
      return {
        total: filters.skip + count + (count === filters.limit ? 1 : 0),
        skip: filters.skip,
        limit: filters.limit,
      }
    }
    return {
      total: browseQuery.data?.total ?? 0,
      skip: browseQuery.data?.skip ?? 0,
      limit: browseQuery.data?.limit ?? filters.limit,
    }
  }, [isSearching, searchQuery.data, browseQuery.data, filters])

  const isLoading = isSearching ? searchQuery.isLoading : browseQuery.isLoading
  const isFetching = isSearching ? searchQuery.isFetching : browseQuery.isFetching
  const isError = isSearching ? searchQuery.isError : browseQuery.isError
  const refetch = isSearching ? searchQuery.refetch : browseQuery.refetch

  return {
    articles,
    pagination,
    isLoading,
    isFetching,
    isError,
    refetch,
    topicsQuery,
    derivedSources,
    isSearching,
  }
}
