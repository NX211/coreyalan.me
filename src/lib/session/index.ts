import { cookies } from 'next/headers';
import { InvoiceNinjaToken } from '@/types/invoice-ninja';
import { invoiceNinjaService } from '@/lib/invoice-ninja';

export class SessionService {
  private static SESSION_COOKIE = 'invoice_ninja_session';

  static async getSession(): Promise<InvoiceNinjaToken | null> {
    const cookieStore = cookies();
    const session = cookieStore.get(this.SESSION_COOKIE);
    
    if (!session) return null;

    try {
      const token = JSON.parse(session.value);
      
      // Check if token is expired
      if (Date.now() >= token.expires_at) {
        // Try to refresh token
        try {
          const newToken = await invoiceNinjaService.refreshToken();
          this.setSession(newToken);
          return newToken;
        } catch (error) {
          console.error('Token refresh failed:', error);
          this.clearSession();
          return null;
        }
      }

      return token;
    } catch (error) {
      console.error('Invalid session:', error);
      this.clearSession();
      return null;
    }
  }

  static setSession(token: InvoiceNinjaToken) {
    const cookieStore = cookies();
    cookieStore.set(this.SESSION_COOKIE, JSON.stringify({
      ...token,
      expires_at: Date.now() + (token.expires_in * 1000),
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }

  static clearSession() {
    const cookieStore = cookies();
    cookieStore.delete(this.SESSION_COOKIE);
  }

  static async validateSession(): Promise<boolean> {
    const session = await this.getSession();
    if (!session) return false;

    try {
      // Verify token is still valid by making a test request
      await invoiceNinjaService.getClient('me');
      return true;
    } catch (error) {
      console.error('Session validation failed:', error);
      this.clearSession();
      return false;
    }
  }
} 