import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware } from '@/middleware/compose';
import { invoiceNinjaService } from '@/lib/invoice-ninja';
import { SessionService } from '@/lib/session';
import { SecurityLogger } from '@/lib/security/logger';

export const GET = securityMiddleware(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    await SecurityLogger.logSecurityEvent('oauth_callback_error', request, {
      error
    });
    return NextResponse.redirect(new URL('/auth/login?error=' + error, request.url));
  }

  if (!code) {
    await SecurityLogger.logSecurityEvent('oauth_callback_missing_code', request);
    return NextResponse.redirect(new URL('/auth/login?error=no_code', request.url));
  }

  try {
    const token = await invoiceNinjaService.exchangeCodeForToken(code);
    SessionService.setSession(token);
    
    // Log successful authentication
    await SecurityLogger.logSecurityEvent('oauth_callback_success', request, {
      tokenType: token.token_type
    });
    
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error: any) {
    console.error('OAuth callback error:', error);
    await SecurityLogger.logSecurityEvent('oauth_callback_failure', request, {
      error: error?.message || 'Unknown error'
    });
    return NextResponse.redirect(new URL('/auth/login?error=auth_failed', request.url));
  }
}); 