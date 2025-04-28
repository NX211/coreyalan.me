import { useState, useCallback, useEffect } from 'react';
import { useToast } from './use-toast';

interface DedupeRequest<T> {
  id: string;
  request: () => Promise<T>;
  timestamp: number;
}

interface DedupeResult<T> {
  id: string;
  result?: T;
  error?: Error;
}

interface UseDedupeOptions {
  dedupeWindow?: number; // in milliseconds
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  showToast?: boolean;
}

export function useDedupe<T>(options: UseDedupeOptions = {}) {
  const {
    dedupeWindow = 1000, // 1 second
    onError,
    onSuccess,
    showToast = true,
  } = options;

  const [requests, setRequests] = useState<Map<string, DedupeRequest<T>>>(new Map());
  const [results, setResults] = useState<Map<string, T>>(new Map());
  const [errors, setErrors] = useState<Map<string, Error>>(new Map());
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const addRequest = useCallback(
    (request: () => Promise<T>, id: string) => {
      const now = Date.now();
      setRequests((prev) => {
        const newRequests = new Map(prev);
        newRequests.set(id, { id, request, timestamp: now });
        return newRequests;
      });
    },
    []
  );

  const processRequests = useCallback(async () => {
    if (requests.size === 0 || isProcessing) return;

    setIsProcessing(true);
    const now = Date.now();
    const requestsToProcess = Array.from(requests.values()).filter(
      (req) => now - req.timestamp >= dedupeWindow
    );

    if (requestsToProcess.length === 0) {
      setIsProcessing(false);
      return;
    }

    // Remove processed requests
    setRequests((prev) => {
      const newRequests = new Map(prev);
      requestsToProcess.forEach((req) => newRequests.delete(req.id));
      return newRequests;
    });

    try {
      const promises = requestsToProcess.map(({ id, request }) =>
        request()
          .then((result) => ({ id, result } as DedupeResult<T>))
          .catch((error) => ({ id, error } as DedupeResult<T>))
      );

      const results = await Promise.all(promises);

      results.forEach(({ id, result, error }) => {
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
      const err = error instanceof Error ? error : new Error('Request processing failed');
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
  }, [requests, dedupeWindow, isProcessing, onError, onSuccess, showToast, toast]);

  useEffect(() => {
    if (requests.size > 0) {
      const timer = setInterval(processRequests, dedupeWindow);
      return () => clearInterval(timer);
    }
  }, [requests, dedupeWindow, processRequests]);

  const getResult = useCallback(
    (id: string) => ({
      data: results.get(id),
      error: errors.get(id),
      isLoading: requests.has(id),
    }),
    [results, errors, requests]
  );

  const clearResults = useCallback(() => {
    setResults(new Map());
    setErrors(new Map());
    setRequests(new Map());
  }, []);

  return {
    addRequest,
    getResult,
    clearResults,
    isProcessing,
    pendingRequests: requests.size,
  };
} 