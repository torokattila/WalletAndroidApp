/**
 * Reusable pull-to-refresh hook
 * Eliminates duplicate refresh logic across all list screens
 */

import { useState, useCallback } from 'react';

export interface UseRefreshControlResult {
  isRefreshing: boolean;
  onRefresh: (refreshAction: () => Promise<void>) => Promise<void>;
  startRefreshing: () => void;
  stopRefreshing: () => void;
}

export const useRefreshControl = (): UseRefreshControlResult => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async (refreshAction: () => Promise<void>) => {
    setIsRefreshing(true);
    try {
      await refreshAction();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const startRefreshing = useCallback(() => {
    setIsRefreshing(true);
  }, []);

  const stopRefreshing = useCallback(() => {
    setIsRefreshing(false);
  }, []);

  return {
    isRefreshing,
    onRefresh,
    startRefreshing,
    stopRefreshing,
  };
};
