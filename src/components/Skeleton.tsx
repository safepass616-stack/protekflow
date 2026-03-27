import React from 'react'
import './Skeleton.css'

interface SkeletonProps {
  width?: string
  height?: string
  variant?: 'text' | 'circular' | 'rectangular'
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'rectangular',
  className = ''
}) => {
  const style = {
    width,
    height: variant === 'text' ? '1em' : height
  }

  return (
    <div
      className={`skeleton skeleton--${variant} ${className}`}
      style={style}
      aria-busy="true"
      aria-live="polite"
    />
  )
}
