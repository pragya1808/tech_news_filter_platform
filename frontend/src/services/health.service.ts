// TODO: /health returns {} in openapi.json. Update once schema is defined.
import apiClient from '@/lib/axios'
import type { HealthResponse } from '@/types'

export const healthService = {
  check: async (): Promise<HealthResponse> => {
    const { data } = await apiClient.get<HealthResponse>('/health')
    return data
  },
}
