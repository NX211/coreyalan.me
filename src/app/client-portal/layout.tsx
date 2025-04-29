import { getSession } from '@/lib/server/session';
import { headers } from 'next/headers';

export default async function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get session data from server-side session management
  const session = await getSession();
  
  // Prepare session data for client components
  const sessionData = { 
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