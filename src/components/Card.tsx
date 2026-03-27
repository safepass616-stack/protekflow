import React from 'react'
import './Card.css'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'lg',
  className = '',
  onClick,
  disabled = false
}) => {
  const classes = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    onClick && 'card--clickable',
    disabled && 'card--disabled',
    className
  ].filter(Boolean).join(' ')

  const Component = onClick ? 'button' : 'div'

  return (
    <Component 
      className={classes} 
      onClick={disabled ? undefined : onClick}
      disabled={onClick && disabled ? true : undefined}
    >
      {children}
    </Component>
  )
}
