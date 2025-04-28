import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

interface UseLoadingOptions {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  showToast?: boolean;
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { onError, onSuccess, showToast = true } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const execute = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fn();
        onSuccess?.();
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        onError?.(error);

        if (showToast) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [onError, onSuccess, showToast, toast]
  );

  return {
    isLoading,
    error,
    execute,
  };
} 