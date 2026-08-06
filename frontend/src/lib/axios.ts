import axios from 'axios'
import { API_BASE_URL, API_TIMEOUT } from '@/constants'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ─── Request interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // TODO: attach auth token here when auth is implemented
    // const token = getToken()
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

// ─── Response interceptor ────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      // Normalize error message
      const message =
        error.response?.data?.detail ?? error.message ?? 'An unexpected error occurred'
      return Promise.reject(new Error(Array.isArray(message) ? message[0]?.msg : message))
    }
    return Promise.reject(error)
  },
)

export default apiClient
