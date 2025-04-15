import { useState, useCallback } from 'react';
import { ApiError, isApiError } from '@/lib/api/errors';

interface UseApiErrorResult {
  error: ApiError | null;
  setError: (error: unknown) => void;
  clearError: () => void;
  handleError: (error: unknown) => void;
}

export function useApiError(): UseApiErrorResult {
  const [error, setApiError] = useState<ApiError | null>(null);

  const setError = useCallback((error: unknown) => {
    if (isApiError(error)) {
      setApiError(error);
    } else if (error instanceof Error) {
      setApiError(new ApiError(500, error.message, 'INTERNAL_ERROR'));
    } else {
      setApiError(new ApiError(500, 'An unexpected error occurred', 'INTERNAL_ERROR'));
    }
  }, []);

  const clearError = useCallback(() => {
    setApiError(null);
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error('API Error:', error);
    setError(error);
  }, [setError]);

  return {
    error,
    setError,
    clearError,
    handleError,
  };
} 