import React, { useEffect, useState, useRef } from 'react'
import './Toast.css'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  type: ToastType
  message: string
  onClose: () => void
  duration?: number
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  onClose,
  duration = 5000
}) => {
  const Icon = icons[type]
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(100)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const remainingTimeRef = useRef<number>(duration)

  useEffect(() => {
    if (duration <= 0) return

    const startTimer = () => {
      startTimeRef.current = Date.now()
      
      timerRef.current = setTimeout(() => {
        onClose()
      }, remainingTimeRef.current)

      // Update progress bar
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current
        const newProgress = Math.max(0, ((remainingTimeRef.current - elapsed) / duration) * 100)
        setProgress(newProgress)
        
        if (newProgress <= 0) {
          clearInterval(progressInterval)
        }
      }, 50)

      return progressInterval
    }

    let progressInterval: NodeJS.Timeout

    if (!isPaused) {
      progressInterval = startTimer()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [duration, onClose, isPaused])

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      const elapsed = Date.now() - startTimeRef.current
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed)
    }
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <div 
      className={`toast toast--${type}`} 
      role="alert"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toast__icon">
        <Icon size={20} />
      </div>
      <p className="toast__message">{message}</p>
      <button
        className="toast__close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
      {duration > 0 && (
        <div className="toast__progress" aria-hidden="true">
          <div 
            className="toast__progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
