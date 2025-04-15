'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ApiError, isApiError } from '@/lib/api/errors';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private getErrorMessage(error: Error): string {
    if (isApiError(error)) {
      return `${error.message} (${error.code})`;
    }
    return error.message || 'An unexpected error occurred';
  }

  private getErrorDetails(error: Error): Record<string, unknown> | undefined {
    if (isApiError(error)) {
      return error.details;
    }
    return undefined;
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const error = this.state.error;
      const errorMessage = error ? this.getErrorMessage(error) : 'An unexpected error occurred';
      const errorDetails = error ? this.getErrorDetails(error) : undefined;

      return (
        <div className="min-h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
            </div>
            
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            
            {errorDetails && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Error Details</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(errorDetails, null, 2)}
                </pre>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Helper component for API errors
interface ApiErrorBoundaryProps {
  children: ReactNode;
  error: ApiError | null;
  onRetry?: () => void;
}

export const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({ 
  children, 
  error,
  onRetry
}) => {
  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 text-red-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900">API Error</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            {error.message} <span className="text-gray-400">({error.code})</span>
          </p>
          
          {error.details && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Error Details</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(error.details, null, 2)}
              </pre>
            </div>
          )}

          {onRetry && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={onRetry}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}; 