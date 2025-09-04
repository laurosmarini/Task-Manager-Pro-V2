import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <AlertTriangle size={48} style={{ color: 'var(--accent-error)', marginBottom: '1rem' }} />
          <h2 style={{
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            Something went wrong
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '500px'
          }}>
            We encountered an unexpected error. This might be due to corrupted data or a temporary issue.
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className="btn btn-primary"
              onClick={this.handleRetry}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <RefreshCw size={16} />
              Try Again
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{
              marginTop: '2rem',
              textAlign: 'left',
              maxWidth: '600px',
              backgroundColor: 'var(--bg-secondary)',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-primary)'
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Error Details (Development)
              </summary>
              <pre style={{
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                overflow: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
