import { useCallback, useState } from 'react';

/**
 * Hook for handling form submissions with loading and error states.
 * Automatically manages loading state and error handling for form submissions.
 *
 * @template T - The type of data returned from the form submission
 * @param onSubmit - Async function to execute when form is submitted
 * @returns Object containing handleSubmit function, loading state, and error state
 *
 * @example
 * const { handleSubmit, loading, error } = useFormSubmit(async (data) => {
 *   return await authService.signin(data);
 * });
 */
export function useFormSubmit<T = unknown>(
  onSubmit: (data: T) => Promise<void>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (data: T) => {
      setError(null);
      setLoading(true);

      try {
        await onSubmit(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [onSubmit]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    handleSubmit,
    loading,
    error,
    clearError,
  };
}
