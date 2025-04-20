import { cookies } from 'next/headers';
import { InvoiceNinjaToken } from '@/types/invoice-ninja';
import { invoiceNinjaService } from '@/lib/invoice-ninja';

const SESSION_COOKIE = 'invoice_ninja_session';

export async function getSession(): Promise<InvoiceNinjaToken | null> {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  
  if (!session) return null;

  try {
    const token: InvoiceNinjaToken = JSON.parse(session.value);
    return token;
  } catch (error) {
    console.error('Invalid session format or parsing error:', error);
    clearSession();
    return null;
  }
}

export function setSession(token: InvoiceNinjaToken): void {
  const cookieStore = cookies();
  const sessionData = JSON.stringify(token);
  
  cookieStore.set(SESSION_COOKIE, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // Set a long expiry since API tokens don't expire
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
}

export function clearSession(): void {
  const cookieStore = cookies();
  cookieStore.delete({ name: SESSION_COOKIE, path: '/' });
}

export async function validateSession(): Promise<boolean> {
  const currentToken = await getSession();
  if (!currentToken) return false;

  try {
    // Set the token for the service instance
    invoiceNinjaService.setToken(currentToken.access_token);
    
    // Verify token is still valid by making a test request
    await invoiceNinjaService.getClient('me');
    
    return true;
  } catch (error) {
    console.error('Session validation failed:', error);
    clearSession();
    return false;
  }
} 