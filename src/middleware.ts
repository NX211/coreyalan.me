import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { securityMiddleware, securityHeaders } from './middleware/security';
import { SessionService } from './lib/session';

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/auth/callback', '/api/auth/callback'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Skip session validation during build time or in edge runtime
  let isValidSession = false;
  try {
    // Only run session validation in runtime environment
    if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
      isValidSession = await SessionService.validateSession();
    }
  } catch (error) {
    console.error('Session validation error:', error);
  }

  if (!isValidSession) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Apply security middleware
  const response = await securityMiddleware(request);
  
  // Add security headers to all responses
  if (response instanceof NextResponse) {
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 