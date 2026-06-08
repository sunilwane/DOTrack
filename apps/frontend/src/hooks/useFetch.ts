import { useCallback, useEffect, useState } from 'react';

interface UseFetchOptions {
  immediate?: boolean;
  deps?: unknown[];
}

/**
 * Hook for fetching data with loading and error states.
 * Useful for GET requests that need to be executed on component mount or when dependencies change.
 *
 * @template T - The type of data returned from the fetch operation
 * @param fetchFunction - Async function that fetches data
 * @param options - Configuration options (immediate execution, dependencies)
 * @returns Object containing data, loading state, error state, and refetch function
 *
 * @example
 * const { data, loading, error, refetch } = useFetch(
 *   () => githubService.getRepos(),
 *   { immediate: true }
 * );
 */
export function useFetch<T>(
  fetchFunction: () => Promise<T>,
  options: UseFetchOptions = {}
) {
  const { immediate = false, deps = [] } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (immediate) {
      void execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, ...deps]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
}
