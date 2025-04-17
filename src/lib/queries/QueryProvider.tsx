'use client'; // Mark as Client Component

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Import useState from React
import React, { useState } from 'react'; 

// Remove client creation from module scope
/*
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});
*/

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  // Instantiate client inside component state using useState
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Consider adjusting staleTime if using SSR/RSC data fetching later
        staleTime: 5 * 60 * 1000, 
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}; 