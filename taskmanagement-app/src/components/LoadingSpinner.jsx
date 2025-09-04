import React from 'react'
import { Loader2 } from 'lucide-react'

function LoadingSpinner({ size = 24, color = 'var(--accent-primary)', className = '' }) {
  return (
    <div
      className={`loading-spinner ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Loader2
        size={size}
        style={{
          color: color,
          animation: 'spin 1s linear infinite'
        }}
      />
    </div>
  )
}

export default LoadingSpinner
