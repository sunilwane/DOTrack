import { useCallback, useState } from 'react';

/**
 * Generic hook for handling async operations with loading and error states.
 * Simplifies the common pattern of managing loading, error, and data states.
 *
 * @template T - The type of data returned from the async operation
 * @returns Object containing execute function, loading state, error state, and data
 *
 * @example
 * const { execute, loading, error, data } = useAsync<User>();
 * await execute(() => userService.getUser(id));
 */
export function useAsync<T = unknown>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    loading,
    error,
    data,
    reset,
  };
}
