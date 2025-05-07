import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { QueryProvider } from '@/lib/queries/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PlausibleProvider from 'next-plausible';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Corey Stone - Full Stack Developer',
  description: 'Turning Vision Into Reality With Code And Design',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = "coreyalan.com";
  const customDomain = "stats.authoritah.com";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider 
          domain={plausibleDomain} 
          customDomain={`https://${customDomain}`} 
          selfHosted={true} 
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <QueryProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 