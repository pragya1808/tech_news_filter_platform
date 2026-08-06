import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // TODO: send to error reporting service
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-center p-6"
          >
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" aria-hidden />
            <h2 className="text-lg font-semibold text-white mb-2">Unexpected error</h2>
            <p className="text-sm text-gray-400 max-w-sm mb-4">
              {this.state.error?.message ?? 'Something went wrong. Please reload the page.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Reload page
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
