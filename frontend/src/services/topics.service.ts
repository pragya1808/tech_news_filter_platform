import apiClient from '@/lib/axios'
import type { TopicResponse } from '@/types'

export const topicsService = {
  getTopics: async (): Promise<TopicResponse[]> => {
    const { data } = await apiClient.get<TopicResponse[]>('/topics')
    return data
  },
}
