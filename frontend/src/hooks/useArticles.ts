import { useQuery } from '@tanstack/react-query'
import { articlesService } from '@/services'
import { QUERY_KEYS, PAGINATION_DEFAULTS } from '@/constants'
import type { GetArticlesParams, SearchArticlesParams } from '@/types'

export function useArticles(params?: GetArticlesParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.articles, params],
    queryFn: () => articlesService.getArticles(params),
  })
}

export function useArticle(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.article(id),
    queryFn: () => articlesService.getArticleById(id),
    enabled: !!id,
  })
}

export function useLatestArticles(limit: number = PAGINATION_DEFAULTS.limit) {
  return useQuery({
    queryKey: [...QUERY_KEYS.latestArticles, limit],
    queryFn: () => articlesService.getLatestArticles({ limit }),
  })
}

export function useSearchArticles(params: SearchArticlesParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.searchArticles(params.q), params],
    queryFn: () => articlesService.searchArticles(params),
    enabled: params.q.trim().length > 0,
  })
}
