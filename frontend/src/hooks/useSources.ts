import { useQuery } from '@tanstack/react-query'
import { sourcesService } from '@/services'

export function useSources() {
  return useQuery({
    queryKey: ['sources'],
    queryFn: () => sourcesService.getSources(),
    staleTime: 5 * 60 * 1000,
  })
}