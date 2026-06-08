import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 border-2',
  md: 'h-12 w-12 border-2',
  lg: 'h-16 w-16 border-4',
};

/**
 * LoadingSpinner component for showing loading states.
 * Can be used inline or as a full-screen overlay.
 *
 * @example
 * <LoadingSpinner size="md" message="Loading..." />
 * <LoadingSpinner fullScreen message="Please wait..." />
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  fullScreen = false,
  className = '',
}) => {
  const spinner = (
    <div className={`inline-block animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]} ${className}`} />
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark">
        <div className="text-center">
          {spinner}
          {message && (
            <p className="mt-4 text-slate-600 dark:text-slate-400">{message}</p>
          )}
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="flex flex-col items-center justify-center">
        {spinner}
        <p className="mt-2 text-slate-600 dark:text-slate-400">{message}</p>
      </div>
    );
  }

  return spinner;
};
