// TODO: All analytics hooks return untyped data until backend defines schemas.
import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '@/services'
import { QUERY_KEYS } from '@/constants'

export function useStats() {
  return useQuery({
    queryKey: QUERY_KEYS.stats,
    queryFn: () => analyticsService.getStats(),
  })
}

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: QUERY_KEYS.analyticsOverview,
    queryFn: () => analyticsService.getOverview(),
  })
}

export function useAnalyticsSources() {
  return useQuery({
    queryKey: QUERY_KEYS.analyticsSources,
    queryFn: () => analyticsService.getSources(),
  })
}

export function useAnalyticsTopics() {
  return useQuery({
    queryKey: QUERY_KEYS.analyticsTopics,
    queryFn: () => analyticsService.getTopicsAnalytics(),
  })
}

export function useAnalyticsDaily() {
  return useQuery({
    queryKey: QUERY_KEYS.analyticsDaily,
    queryFn: () => analyticsService.getDaily(),
  })
}
