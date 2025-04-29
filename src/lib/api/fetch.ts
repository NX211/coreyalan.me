'use client';

import { useCsrf } from '@/components/CsrfProvider';

/**
 * Hook for using API fetch with CSRF protection
 * Returns a fetch function that automatically includes CSRF tokens for non-GET requests
 */
export function useApiFetch() {
  const { csrfFetch } = useCsrf();
  
  return async (url: string, options: RequestInit = {}) => {
    try {
      // Add API prefix if not already present
      const apiUrl = url.startsWith('/api') || url.startsWith('http') ? url : `/api/${url}`;
      
      // Include JSON content type if not specified
      const headersObj = new Headers(options.headers || {});
      if (!headersObj.has('Content-Type')) {
        headersObj.set('Content-Type', 'application/json');
      }
      
      // Use the CSRF fetch to make the request
      const response = await csrfFetch(apiUrl, {
        ...options,
        headers: headersObj,
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || 'API request failed');
      }
      
      return response;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  };
} 