import React from 'react';

interface ErrorAlertProps {
  error: string | null;
  className?: string;
  onDismiss?: () => void;
}

/**
 * ErrorAlert component for displaying error messages.
 * Shows a styled error message with optional dismiss button.
 *
 * @example
 * <ErrorAlert error={error} />
 * <ErrorAlert error={error} onDismiss={() => setError(null)} />
 */
export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  className = '',
  onDismiss,
}) => {
  if (!error) return null;

  return (
    <div
      className={`p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start justify-between gap-3 ${className}`}
    >
      <div className="flex items-start gap-2 flex-1">
        <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">error</span>
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
          aria-label="Dismiss error"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      )}
    </div>
  );
};
