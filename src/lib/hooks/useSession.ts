import { useEffect, useState } from 'react';

interface SessionData {
  isAuthenticated: boolean;
}

export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="session"]');
    if (metaTag) {
      try {
        const sessionData = JSON.parse(metaTag.getAttribute('content') || '{}');
        setSession(sessionData);
      } catch (error) {
        console.error('Failed to parse session data:', error);
        setSession({ isAuthenticated: false });
      }
    }
  }, []);

  return session;
} 