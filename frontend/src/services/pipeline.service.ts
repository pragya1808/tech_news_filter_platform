// Pipeline service — placeholder implementations.
// TODO: Replace these stubs with real API calls once backend exposes pipeline endpoints.
// Suggested future endpoints:
//   GET /pipeline/status  → PipelineOverview
//   GET /pipeline/runs    → PipelineRun[]
//   GET /pipeline/health  → component health map

import type { PipelineOverview, PipelineRun } from '@/types/pipeline'

/** TODO: Replace with GET /pipeline/status */
export async function getPipelineOverview(): Promise<PipelineOverview> {
  return Promise.resolve({
    status: 'idle',
    articlesProcessed: 0,
    activeSources: 0,
    lastRunAt: null,
    nextRunAt: null,
  })
}

/** TODO: Replace with GET /pipeline/runs */
export async function getPipelineRuns(): Promise<PipelineRun[]> {
  return Promise.resolve([])
}
