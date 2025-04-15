import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/app-providers/ThemeProvider';
import { PlausibleAnalytics } from '@/components/app-providers/PlausibleAnalytics';
import { QueryProvider } from '@/lib/queries/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <PlausibleAnalytics />
          <QueryProvider>
            <div className="flex flex-col min-h-screen dark:bg-[#0F172A]">
              <Header />
              <main className="flex-grow dark:bg-[#0F172A]">
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