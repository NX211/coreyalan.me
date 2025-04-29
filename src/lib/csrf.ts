'use client';

import { useSession } from 'next-auth/react';

/**
 * Hook to get the CSRF token from the session
 * @returns The CSRF token or null if not authenticated
 */
export function useCsrfToken(): string | null {
  const { data: session } = useSession();
  return session?.csrfToken || null;
}

/**
 * Adds CSRF token to fetch headers for non-GET requests
 * @param headers - Headers object to add CSRF token to
 * @param csrfToken - CSRF token to add
 * @returns Headers with CSRF token added
 */
export function addCsrfToken(headers: HeadersInit = {}, csrfToken: string | null): HeadersInit {
  const headersObj = new Headers(headers);
  
  if (csrfToken) {
    headersObj.set('X-CSRF-Token', csrfToken);
  }
  
  return headersObj;
}

/**
 * Higher-order function that wraps fetch with CSRF token handling
 * @param csrfToken - CSRF token to include in requests
 * @returns A fetch function that automatically includes the CSRF token
 */
export function createCsrfFetch(csrfToken: string | null) {
  return async (url: RequestInfo | URL, options: RequestInit = {}): Promise<Response> => {
    const method = options.method?.toUpperCase() || 'GET';
    
    // Only add CSRF token for non-GET requests
    if (method !== 'GET' && csrfToken) {
      const headers = addCsrfToken(options.headers, csrfToken);
      return fetch(url, { ...options, headers });
    }
    
    return fetch(url, options);
  };
} 