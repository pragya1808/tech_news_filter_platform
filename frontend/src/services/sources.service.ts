import apiClient from '@/lib/axios'

export const sourcesService = {
  getSources: async (): Promise<string[]> => {
    const { data } = await apiClient.get<string[]>('/sources')
    return data
  },
}