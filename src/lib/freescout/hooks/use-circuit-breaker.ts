import { useState, useCallback, useEffect } from 'react';
import { useToast } from './use-toast';

interface CircuitBreakerState {
  isOpen: boolean;
  failureCount: number;
  lastFailureTime: number;
  halfOpenTime: number;
}

interface UseCircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeout?: number; // in milliseconds
  halfOpenTimeout?: number; // in milliseconds
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  showToast?: boolean;
}

export function useCircuitBreaker<T>(options: UseCircuitBreakerOptions = {}) {
  const {
    failureThreshold = 5,
    resetTimeout = 30000, // 30 seconds
    halfOpenTimeout = 5000, // 5 seconds
    onError,
    onSuccess,
    showToast = true,
  } = options;

  const [state, setState] = useState<CircuitBreakerState>({
    isOpen: false,
    failureCount: 0,
    lastFailureTime: 0,
    halfOpenTime: 0,
  });

  const { toast } = useToast();

  const execute = useCallback(
    async (request: () => Promise<T>): Promise<T | null> => {
      const now = Date.now();

      // Check if circuit is open
      if (state.isOpen) {
        // Check if we should try to reset
        if (now - state.lastFailureTime >= resetTimeout) {
          setState((prev) => ({
            ...prev,
            isOpen: false,
            halfOpenTime: now,
          }));

          try {
            const result = await request();
            // Success in half-open state, reset circuit
            setState({
              isOpen: false,
              failureCount: 0,
              lastFailureTime: 0,
              halfOpenTime: 0,
            });
            onSuccess?.();
            return result;
          } catch (error) {
            // Failed in half-open state, open circuit again
            const err = error instanceof Error ? error : new Error('Request failed');
            setState((prev) => ({
              ...prev,
              isOpen: true,
              lastFailureTime: now,
            }));
            onError?.(err);
            if (showToast) {
              toast({
                variant: 'destructive',
                title: 'Circuit Breaker',
                description: 'Circuit is open. Please try again later.',
              });
            }
            return null;
          }
        }

        // Circuit is still open
        if (showToast) {
          toast({
            variant: 'destructive',
            title: 'Circuit Breaker',
            description: 'Circuit is open. Please try again later.',
          });
        }
        return null;
      }

      // Circuit is closed, execute request
      try {
        const result = await request();
        // Success, reset failure count
        setState((prev) => ({
          ...prev,
          failureCount: 0,
        }));
        onSuccess?.();
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Request failed');
        setState((prev) => {
          const newFailureCount = prev.failureCount + 1;
          const isOpen = newFailureCount >= failureThreshold;

          return {
            ...prev,
            failureCount: newFailureCount,
            isOpen,
            lastFailureTime: now,
          };
        });

        onError?.(err);
        if (showToast) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: err.message,
          });
        }
        return null;
      }
    },
    [state, failureThreshold, resetTimeout, onError, onSuccess, showToast, toast]
  );

  const reset = useCallback(() => {
    setState({
      isOpen: false,
      failureCount: 0,
      lastFailureTime: 0,
      halfOpenTime: 0,
    });
  }, []);

  return {
    execute,
    reset,
    state,
  };
} 