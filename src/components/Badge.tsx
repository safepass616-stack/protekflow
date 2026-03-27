import React from 'react'
import './Badge.css'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    className
  ].filter(Boolean).join(' ')

  return <span className={classes}>{children}</span>
}
