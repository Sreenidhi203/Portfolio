import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch() {
    // Errors are surfaced via the UI; no logging needed in production
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center"
        >
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Something went wrong.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-violet-500 hover:text-violet-600 dark:border-gray-700 dark:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
