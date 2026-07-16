import apiClient from '@/lib/axios'
import type {
  ArticleListResponse,
  ArticleResponse,
  GetArticlesParams,
  LatestArticlesParams,
  SearchArticlesParams,
} from '@/types'

export const articlesService = {
  getArticles: async (params?: GetArticlesParams): Promise<ArticleListResponse> => {
    const { data } = await apiClient.get<ArticleListResponse>('/articles', { params })
    return data
  },

  getArticleById: async (id: number): Promise<ArticleResponse> => {
    const { data } = await apiClient.get<ArticleResponse>(`/articles/${id}`)
    return data
  },

  getLatestArticles: async (params?: LatestArticlesParams): Promise<ArticleResponse[]> => {
    const { data } = await apiClient.get<ArticleResponse[]>('/articles/latest', { params })
    return data
  },

  searchArticles: async (params: SearchArticlesParams): Promise<ArticleResponse[]> => {
    const { data } = await apiClient.get<ArticleResponse[]>('/articles/search', { params })
    return data
  },
}
