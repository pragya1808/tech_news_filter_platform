import { useQuery } from '@tanstack/react-query'
import { topicsService } from '@/services'
import { QUERY_KEYS } from '@/constants'

export function useTopics() {
  return useQuery({
    queryKey: QUERY_KEYS.topics,
    queryFn: () => topicsService.getTopics(),
    staleTime: 5 * 60 * 1000, // topics rarely change — cache for 5 min
  })
}
