import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SessionService } from './lib/session';

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/auth/callback', '/api/auth/callback'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Skip session validation during build/static generation (check if request.ip exists)
  let isValidSession = false;
  if (request.ip) { // Only run validation if it seems like a real request
    try {
        isValidSession = await SessionService.validateSession();
    } catch (error) {
      console.error('Session validation error during request:', error);
      // Decide how to handle validation errors at runtime (e.g., redirect or allow)
      // For now, let's treat validation error as invalid session
      isValidSession = false; 
    }
  } else {
    // Assume session is valid during build/static generation to allow prerendering
    // Or potentially return NextResponse.next() if prerendering protected pages isn't desired
    // For now, let's assume we want static pages built, treating session as valid
    isValidSession = true; 
  }

  if (!isValidSession) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If session is valid (or assumed valid during build), allow request
  // Note: Security headers should be applied globally in next.config.js or another mechanism
  return NextResponse.next(); 
}

// Define which paths the middleware should run on
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - / (root path if it should be public, adjust as needed)
    // Add other public paths like /images/* if needed
    '/((?!api|_next/static|_next/image|favicon.ico).+)',
    // Include root path if it needs protection, otherwise exclude it
    // '/',
  ],
}; 