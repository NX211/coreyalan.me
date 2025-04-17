import { cookies } from 'next/headers';
import { InvoiceNinjaToken } from '@/types/invoice-ninja';
import { invoiceNinjaService } from '@/lib/invoice-ninja';

const SESSION_COOKIE = 'invoice_ninja_session';

export async function getSession(): Promise<InvoiceNinjaToken | null> {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  
  if (!session) return null;

  try {
    const token: InvoiceNinjaToken & { expires_at?: number } = JSON.parse(session.value);
    
    // Check if token is expired (expires_at should be set by setSession)
    if (token.expires_at && Date.now() >= token.expires_at) {
      // Try to refresh token
      try {
        // Ensure the service has the current refresh token if needed
        // Note: invoiceNinjaService seems stateless, relies on token passed to methods or stored internally?
        // Assuming refreshToken uses a stored token or needs one passed.
        // If it relies on an internal state set by previous calls, this might be an issue.
        // Let's assume it can get the refresh token needed.
        const newToken = await invoiceNinjaService.refreshToken(); // Might need modification if service requires old token state
        setSession(newToken);
        return newToken;
      } catch (error) {
        console.error('Token refresh failed:', error);
        clearSession();
        return null;
      }
    }

    // Remove expires_at before returning if it exists, return pure InvoiceNinjaToken
    const { expires_at, ...tokenToReturn } = token;
    return tokenToReturn as InvoiceNinjaToken;

  } catch (error) {
    console.error('Invalid session format or parsing error:', error);
    clearSession();
    return null;
  }
}

export function setSession(token: InvoiceNinjaToken): void {
  const cookieStore = cookies();
  const sessionData = JSON.stringify({
    ...token,
    // Calculate expiry timestamp when setting the cookie
    expires_at: Date.now() + (token.expires_in * 1000),
  });
  
  cookieStore.set(SESSION_COOKIE, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // Consider adding maxAge or expires for browser cookie management
    maxAge: token.expires_in, // Set cookie maxAge to match token expiry
  });
}

export function clearSession(): void {
  const cookieStore = cookies();
  // Ensure deletion options match setting options for robustness
  cookieStore.delete({ name: SESSION_COOKIE, path: '/' }); 
}

export async function validateSession(): Promise<boolean> {
  const currentToken = await getSession();
  if (!currentToken) return false;

  try {
    // Temporarily set the token for the service instance for validation call
    // This assumes invoiceNinjaService needs the token explicitly set for requests.
    // If invoiceNinjaService manages its own token state internally based on prior calls,
    // this might need adjustment.
    invoiceNinjaService.setToken(currentToken); 
    
    // Verify token is still valid by making a test request
    await invoiceNinjaService.getClient('me'); // Requires 'me' endpoint or similar test
    
    // Clear the temporarily set token if service is meant to be stateless between requests
    // invoiceNinjaService.setToken(null); 

    return true;
  } catch (error) {
    console.error('Session validation API call failed:', error);
    clearSession(); // Clear session if validation fails
    return false;
  }
} 