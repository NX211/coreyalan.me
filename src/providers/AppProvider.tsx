import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SessionProvider session={null}>
      {children}
    </SessionProvider>
  );
} 