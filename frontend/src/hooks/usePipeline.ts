// Pipeline data hook.
// All data is currently placeholder — no backend endpoints exist yet.
// TODO: Replace useQuery stubs with real queries once backend exposes pipeline endpoints.
import { useQuery } from '@tanstack/react-query'
import { getPipelineOverview, getPipelineRuns } from '@/services/pipeline.service'

const PIPELINE_QUERY_KEYS = {
  overview: ['pipeline', 'overview'] as const,
  runs: ['pipeline', 'runs'] as const,
}

export function usePipelineOverview() {
  return useQuery({
    queryKey: PIPELINE_QUERY_KEYS.overview,
    queryFn: getPipelineOverview,
    staleTime: 30_000,
  })
}

export function usePipelineRuns() {
  return useQuery({
    queryKey: PIPELINE_QUERY_KEYS.runs,
    queryFn: getPipelineRuns,
    staleTime: 30_000,
  })
}
