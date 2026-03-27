import React from 'react';
import { Loader2 } from 'lucide-react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 20, className = '' }) => {
  return (
    <Loader2 
      size={size} 
      className={`loading-spinner ${className}`}
      aria-label="Loading"
      role="status"
    />
  );
};

export default LoadingSpinner;
