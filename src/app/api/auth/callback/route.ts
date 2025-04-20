import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware } from '@/middleware/compose';
import { invoiceNinjaService } from '@/lib/invoice-ninja';
import { setSession } from '@/lib/session';
import { SecurityLogger } from '@/lib/security/logger';
import { InvoiceNinjaToken } from '@/types/invoice-ninja';

export const GET = securityMiddleware(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    await SecurityLogger.logSecurityEvent('auth_callback_missing_token', request);
    return NextResponse.redirect(new URL('/auth/login?error=no_token', request.url));
  }

  try {
    // Create a proper token object
    const tokenData: InvoiceNinjaToken = {
      access_token: token,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour
      refresh_token: token, // Using the same token for refresh in this case
    };

    invoiceNinjaService.setToken(token);
    setSession(tokenData);
    
    // Log successful authentication
    await SecurityLogger.logSecurityEvent('auth_callback_success', request);
    
    const redirectUrl = new URL('/client-portal', request.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    console.error('Auth callback error:', error);
    await SecurityLogger.logSecurityEvent('auth_callback_failure', request, {
      error: error?.message || 'Unknown error'
    });
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('error', 'authentication_failed');
    return NextResponse.redirect(loginUrl);
  }
}); 