import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware } from '@/middleware/compose';
import { SecurityLogger } from '@/lib/security/logger';

export const POST = securityMiddleware(async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const apiToken = formData.get('api-token');

    if (!apiToken || typeof apiToken !== 'string') {
      await SecurityLogger.logSecurityEvent('login_missing_token', request);
      return NextResponse.redirect(new URL('/auth/login?error=no_token', request.url));
    }

    // Redirect to callback with the token
    const callbackUrl = new URL('/api/auth/callback', request.url);
    callbackUrl.searchParams.set('token', apiToken);
    
    return NextResponse.redirect(callbackUrl);
  } catch (error: any) {
    console.error('Login error:', error);
    await SecurityLogger.logSecurityEvent('login_failure', request, {
      error: error?.message || 'Unknown error'
    });
    return NextResponse.redirect(new URL('/auth/login?error=login_failed', request.url));
  }
}); 