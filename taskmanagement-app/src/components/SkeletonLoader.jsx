import React from 'react'

function SkeletonLoader({ className = '', style = {}, variant = 'default' }) {
  const baseStyle = {
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: '0.375rem',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    ...style
  }

  if (variant === 'task') {
    return (
      <div className={`skeleton-loader task-skeleton ${className}`} style={{
        ...baseStyle,
        padding: '1rem',
        marginBottom: '0.75rem',
        minHeight: '120px'
      }}>
        <div style={{
          ...baseStyle,
          height: '1.25rem',
          width: '70%',
          marginBottom: '0.5rem'
        }} />
        <div style={{
          ...baseStyle,
          height: '0.875rem',
          width: '90%',
          marginBottom: '0.75rem'
        }} />
        <div style={{
          ...baseStyle,
          height: '0.75rem',
          width: '50%'
        }} />
      </div>
    )
  }

  if (variant === 'note') {
    return (
      <div className={`skeleton-loader note-skeleton ${className}`} style={{
        ...baseStyle,
        padding: '1.5rem',
        marginBottom: '1rem',
        minHeight: '150px'
      }}>
        <div style={{
          ...baseStyle,
          height: '1.125rem',
          width: '60%',
          marginBottom: '0.5rem'
        }} />
        <div style={{
          ...baseStyle,
          height: '0.75rem',
          width: '40%',
          marginBottom: '1rem'
        }} />
        <div style={{
          ...baseStyle,
          height: '0.875rem',
          width: '100%',
          marginBottom: '0.5rem'
        }} />
        <div style={{
          ...baseStyle,
          height: '0.875rem',
          width: '80%'
        }} />
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`skeleton-loader card-skeleton ${className}`} style={{
        ...baseStyle,
        padding: '1.5rem',
        minHeight: '200px'
      }}>
        <div style={{
          ...baseStyle,
          height: '1.5rem',
          width: '50%',
          marginBottom: '1rem'
        }} />
        <div style={{
          ...baseStyle,
          height: '1rem',
          width: '30%',
          marginBottom: '1.5rem'
        }} />
        <div style={{
          ...baseStyle,
          height: '0.875rem',
          width: '100%',
          marginBottom: '0.5rem'
        }} />
        <div style={{
          ...baseStyle,
          height: '0.875rem',
          width: '90%',
          marginBottom: '0.5rem'
        }} />
        <div style={{
          ...baseStyle,
          height: '0.875rem',
          width: '70%'
        }} />
      </div>
    )
  }

  // Default skeleton
  return (
    <div
      className={`skeleton-loader ${className}`}
      style={baseStyle}
    />
  )
}

// Skeleton list component for multiple items
export function SkeletonList({ count = 3, variant = 'default', className = '' }) {
  return (
    <div className={`skeleton-list ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonLoader key={index} variant={variant} />
      ))}
    </div>
  )
}

export default SkeletonLoader
