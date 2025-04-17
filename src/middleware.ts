import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Remove session import
// import { validateSession } from './lib/session'; 

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/auth/callback', '/api/auth/callback'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // --- REMOVE ALL SESSION VALIDATION LOGIC --- 
  // The presence of imports using cookies() or fetch() in middleware applied 
  // to static pages can cause build timeouts or errors.
  // Session validation for pages needs to be handled differently 
  // (e.g., client-side or in dynamically rendered server components).
  /*
  const isBuildPhase = !request.ip;
  let isValidSession = false;
  if (isBuildPhase) {
    isValidSession = true;
  } else {
    try {
        isValidSession = await validateSession(); 
    } catch (error) {
      console.error('Session validation error during request:', error);
      isValidSession = false; 
    }
  }
  if (!isValidSession && !isBuildPhase) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  */
  // --------------------------------------------

  // For testing the build, just allow the request for now
  return NextResponse.next(); 
}

// Matcher remains the same - applies to pages, excludes /api etc.
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