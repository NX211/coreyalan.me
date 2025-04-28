import { useState, useCallback, useEffect } from 'react';
import { useToast } from './use-toast';

interface BatchRequest<T> {
  id: string;
  request: () => Promise<T>;
}

interface BatchResult<T> {
  id: string;
  result?: T;
  error?: Error;
}

interface UseBatchOptions {
  batchSize?: number;
  batchDelay?: number;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  showToast?: boolean;
}

export function useBatch<T>(options: UseBatchOptions = {}) {
  const {
    batchSize = 10,
    batchDelay = 100,
    onError,
    onSuccess,
    showToast = true,
  } = options;

  const [queue, setQueue] = useState<BatchRequest<T>[]>([]);
  const [results, setResults] = useState<Map<string, T>>(new Map());
  const [errors, setErrors] = useState<Map<string, Error>>(new Map());
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const addToQueue = useCallback(
    (request: () => Promise<T>, id: string) => {
      setQueue((prev) => [...prev, { id, request }]);
    },
    []
  );

  const processBatch = useCallback(async () => {
    if (queue.length === 0 || isProcessing) return;

    setIsProcessing(true);
    const batch = queue.slice(0, batchSize);
    setQueue((prev) => prev.slice(batchSize));

    try {
      const promises = batch.map(({ id, request }) =>
        request()
          .then((result) => ({ id, result } as BatchResult<T>))
          .catch((error) => ({ id, error } as BatchResult<T>))
      );

      const batchResults = await Promise.all(promises);

      batchResults.forEach(({ id, result, error }) => {
        if (error) {
          setErrors((prev) => new Map(prev).set(id, error));
          onError?.(error);
          if (showToast) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: error.message,
            });
          }
        } else if (result) {
          setResults((prev) => new Map(prev).set(id, result));
        }
      });

      onSuccess?.();
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Batch processing failed');
      onError?.(err);
      if (showToast) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message,
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }, [queue, batchSize, isProcessing, onError, onSuccess, showToast, toast]);

  useEffect(() => {
    if (queue.length > 0) {
      const timer = setTimeout(processBatch, batchDelay);
      return () => clearTimeout(timer);
    }
  }, [queue, batchDelay, processBatch]);

  const getResult = useCallback(
    (id: string) => ({
      data: results.get(id),
      error: errors.get(id),
      isLoading: queue.some((item) => item.id === id),
    }),
    [results, errors, queue]
  );

  const clearResults = useCallback(() => {
    setResults(new Map());
    setErrors(new Map());
  }, []);

  return {
    addToQueue,
    getResult,
    clearResults,
    isProcessing,
    queueLength: queue.length,
  };
} 