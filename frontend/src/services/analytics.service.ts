
import apiClient from '@/lib/axios'
import type {
  AnalyticsDailyResponse,
  AnalyticsOverviewResponse,
  AnalyticsSourcesResponse,
  AnalyticsTopicsResponse,
  StatsResponse,
} from '@/types'

export const analyticsService = {
  getStats: async (): Promise<StatsResponse> => {
    const { data } = await apiClient.get<StatsResponse>('/stats')
    return data
  },

  getOverview: async (): Promise<AnalyticsOverviewResponse> => {
    const { data } = await apiClient.get<AnalyticsOverviewResponse>('/analytics/overview')
    return data
  },

  getSources: async (): Promise<AnalyticsSourcesResponse> => {
    const { data } = await apiClient.get<AnalyticsSourcesResponse>('/analytics/sources')
    return data
  },

  getTopicsAnalytics: async (): Promise<AnalyticsTopicsResponse> => {
    const { data } = await apiClient.get<AnalyticsTopicsResponse>('/analytics/topics')
    return data
  },

  getDaily: async (): Promise<AnalyticsDailyResponse> => {
    const { data } = await apiClient.get<AnalyticsDailyResponse>('/analytics/daily')
    return data
  },
}
