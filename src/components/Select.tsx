import React from 'react'
import './Select.css'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  options: SelectOption[]
  loading?: boolean
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  options,
  loading = false,
  id,
  className = '',
  disabled,
  ...props
}) => {
  // Generate deterministic ID from label if not provided
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : `select-${Math.random().toString(36).substr(2, 9)}`)
  const errorId = error ? `${selectId}-error` : undefined
  const helperId = helperText ? `${selectId}-helper` : undefined

  return (
    <div className={`select-wrapper ${fullWidth ? 'select-wrapper--full-width' : ''} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
        </label>
      )}
      <div className="select-container">
        <select
          id={selectId}
          className={`select ${error ? 'select--error' : ''} ${loading ? 'select--loading' : ''}`}
          aria-invalid={!!error}
          aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? (
            <option>Loading...</option>
          ) : (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          )}
        </select>
        {loading && (
          <div className="select-spinner" aria-hidden="true">
            <svg className="spinner" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <span id={errorId} className="select-error" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={helperId} className="select-helper">
          {helperText}
        </span>
      )}
    </div>
  )
}
