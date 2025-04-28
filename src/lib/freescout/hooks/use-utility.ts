import { useCallback, useEffect, useState } from 'react';
import { FreeScoutUtilityService } from '../services/utility.service';
import { getFreeScoutClient } from '../client';
import { z } from 'zod';

interface UseUtilityOptions<T> {
  schema?: z.ZodSchema<T>;
  cacheKey?: string;
  enabled?: boolean;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
}

export function useUtility<T>(
  endpoint: string,
  options: RequestInit = {},
  hookOptions: UseUtilityOptions<T> = {}
) {
  const {
    schema,
    cacheKey,
    enabled = true,
    onError,
    onSuccess,
  } = hookOptions;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const utilityService = useCallback(() => {
    const client = getFreeScoutClient();
    return new FreeScoutUtilityService(client);
  }, []);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const service = utilityService();
      const result = await service.makeRequest<T>(endpoint, options, schema);
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, options, schema, enabled, utilityService, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const clearCache = useCallback(() => {
    const service = utilityService();
    service.clearCache(cacheKey || endpoint);
  }, [utilityService, cacheKey, endpoint]);

  return {
    data,
    isLoading,
    error,
    refetch,
    clearCache,
  };
} 