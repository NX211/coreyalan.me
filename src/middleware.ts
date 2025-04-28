import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get session from cookie
  const sessionId = request.cookies.get('session')?.value;
  const isAuthenticated = !!sessionId;

  // Skip middleware for dev login in development
  if (process.env.NODE_ENV === 'development' && request.nextUrl.pathname === '/dev-login') {
    return NextResponse.next();
  }

  // If user is authenticated and trying to access auth pages, redirect to client portal
  if (isAuthenticated && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/client-portal/dashboard', request.url));
  }

  // Skip authentication for documents page
  if (request.nextUrl.pathname.startsWith('/client-portal/documents')) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!isAuthenticated && (
    request.nextUrl.pathname.startsWith('/client-portal/billing') ||
    request.nextUrl.pathname.startsWith('/client-portal/dashboard') ||
    request.nextUrl.pathname.startsWith('/client-portal/profile')
  )) {
    const returnUrl = request.nextUrl.pathname;
    return NextResponse.redirect(new URL(`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/client-portal/billing/:path*',
    '/client-portal/dashboard/:path*',
    '/client-portal/profile/:path*',
    '/dev-login'
  ]
}; 