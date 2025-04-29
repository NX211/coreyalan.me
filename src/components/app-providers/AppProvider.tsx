import React from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { CsrfProvider } from '../CsrfProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SessionProvider session={null}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CsrfProvider>
          {children}
        </CsrfProvider>
      </ThemeProvider>
    </SessionProvider>
  );
} 