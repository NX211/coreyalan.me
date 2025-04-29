'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useCsrfToken, createCsrfFetch } from '@/lib/csrf';

// Create context
type CsrfContextType = {
  csrfToken: string | null;
  csrfFetch: (url: RequestInfo | URL, options?: RequestInit) => Promise<Response>;
};

const CsrfContext = createContext<CsrfContextType>({
  csrfToken: null,
  csrfFetch: fetch,
});

export function useCsrf() {
  return useContext(CsrfContext);
}

export function CsrfProvider({ children }: { children: React.ReactNode }) {
  const csrfToken = useCsrfToken();
  const csrfFetch = createCsrfFetch(csrfToken);
  
  return (
    <CsrfContext.Provider value={{ csrfToken, csrfFetch }}>
      {children}
    </CsrfContext.Provider>
  );
}

/**
 * Form component that automatically includes CSRF token
 */
export function CsrfForm({ 
  children, 
  action, 
  method = 'post',
  ...props 
}: React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
}) {
  const { csrfToken } = useCsrf();
  
  return (
    <form action={action} method={method} {...props}>
      {method.toLowerCase() !== 'get' && csrfToken && (
        <input type="hidden" name="_csrf" value={csrfToken} />
      )}
      {children}
    </form>
  );
} 