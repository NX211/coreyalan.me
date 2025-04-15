import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware } from '@/middleware/compose';
import { invoiceNinjaService } from '@/lib/invoice-ninja';
import { SecurityLogger } from '@/lib/security/logger';
import { ApiError } from '@/lib/api/errors';

export const POST = securityMiddleware(async (request: NextRequest) => {
  try {
    // Clear the token from the service
    invoiceNinjaService.setToken(null as any);
    
    // Create response that clears the session cookie
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.set('invoice_ninja_session', '', {
      path: '/',
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // Log successful logout
    await SecurityLogger.logSecurityEvent('logout_success', request);

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    await SecurityLogger.logSecurityEvent('logout_error', request, {
      error: error?.message || 'Unknown error'
    });
    
    return NextResponse.redirect(new URL('/auth/login?error=logout_failed', request.url));
  }
}); 