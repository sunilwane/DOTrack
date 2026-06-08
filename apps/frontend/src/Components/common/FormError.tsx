import React from 'react';

interface FormErrorProps {
  error: string | null;
  className?: string;
}

/**
 * FormError component for displaying form validation errors.
 * Compact version of ErrorAlert specifically for forms.
 *
 * @example
 * <FormError error={error} />
 */
export const FormError: React.FC<FormErrorProps> = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <div
      className={`p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 ${className}`}
    >
      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
    </div>
  );
};
