/**
 * Reusable async action handler with loading and error states
 * Eliminates duplicate loading/error handling across all hooks
 */

import { useState, useCallback } from 'react';

export interface UseAsyncActionResult<T = void> {
  isLoading: boolean;
  error: Error | null;
  execute: (action: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}

export const useAsyncAction = <T = void,>(): UseAsyncActionResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (action: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await action();
      return result;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    execute,
    reset,
  };
};
