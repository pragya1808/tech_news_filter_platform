// Pipeline types — all placeholder until backend implements monitoring endpoints.
// TODO: Replace with real API types once backend defines pipeline monitoring schema.

export type PipelineStatus = 'running' | 'idle' | 'error' | 'paused'
export type StageStatus = 'active' | 'idle' | 'error' | 'pending'
export type RunStatus = 'success' | 'running' | 'failed' | 'queued'

export interface PipelineOverview {
  // TODO: populate from a real pipeline status endpoint
  status: PipelineStatus
  articlesProcessed: number
  activeSources: number
  lastRunAt: string | null
  nextRunAt: string | null
}

export interface PipelineStage {
  id: string
  label: string
  description: string
  technology: string
  status: StageStatus
}

export interface PipelineRun {
  // TODO: populate from a real pipeline runs endpoint
  id: string
  status: RunStatus
  durationMs: number | null
  articlesProcessed: number | null
  startedAt: string
}

export interface FutureWidget {
  id: string
  label: string
  description: string
}
