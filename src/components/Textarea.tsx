import React from 'react'
import './Textarea.css'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  id,
  className = '',
  ...props
}) => {
  // Generate deterministic ID from label if not provided
  const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : `textarea-${Math.random().toString(36).substr(2, 9)}`)
  const errorId = error ? `${textareaId}-error` : undefined
  const helperId = helperText ? `${textareaId}-helper` : undefined

  return (
    <div className={`textarea-wrapper ${fullWidth ? 'textarea-wrapper--full-width' : ''} ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="textarea-label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`textarea ${error ? 'textarea--error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
        {...props}
      />
      {error && (
        <span id={errorId} className="textarea-error" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={helperId} className="textarea-helper">
          {helperText}
        </span>
      )}
    </div>
  )
}
