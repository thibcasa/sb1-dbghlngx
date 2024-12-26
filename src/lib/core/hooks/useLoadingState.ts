import { useState, useCallback } from 'react';
import { useAsyncError } from './useAsyncError';

interface UseLoadingState {
  loading: boolean;
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
}

export function useLoadingState(): UseLoadingState {
  const [loading, setLoading] = useState(false);
  const throwError = useAsyncError();

  const withLoading = useCallback(async <T>(promise: Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throwError(error instanceof Error ? error : new Error('Une erreur est survenue'));
      throw error;
    } finally {
      setLoading(false);
    }
  }, [throwError]);

  return { loading, withLoading };
}