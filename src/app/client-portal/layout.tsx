import { getSession } from '@/lib/server/session';
import { headers } from 'next/headers';

export default async function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get pathname from headers
  const pathname = headers().get('x-url')?.split('?')[0] || '/';
  
  // Don't pass session data for documents page
  const isDocumentsPage = pathname.startsWith('/client-portal/documents');
  
  // Get session data from server-side session management
  const session = isDocumentsPage ? null : await getSession();
  
  // Prepare session data for client components
  const sessionData = isDocumentsPage ? { isAuthenticated: false } : { 
    isAuthenticated: !!session,
    email: session?.email,
    name: session?.name,
    role: session?.role
  };
  
  // Pass session data as a prop through special meta tag
  // This allows client components to read the session without direct server imports
  return (
    <>
      <meta name="session" content={JSON.stringify(sessionData)} />
      {children}
    </>
  );
} 