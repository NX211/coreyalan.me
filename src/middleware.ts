import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Import specific functions instead of the class
import { validateSession } from './lib/session'; 

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/auth/callback', '/api/auth/callback'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Determine if running during build phase (e.g., check for specific build env var or lack of runtime context)
  // A simple heuristic: Lack of request.ip often indicates a build-time prerender request.
  const isBuildPhase = !request.ip;

  let isValidSession = false;
  if (isBuildPhase) {
    // Assume session is valid during build/static generation to allow prerendering
    // Static pages will be built; runtime checks will handle actual user sessions.
    isValidSession = true;
  } else {
    // Only perform runtime validation when it's a real user request
    try {
        // Call the validateSession function directly
        isValidSession = await validateSession(); 
    } catch (error) {
      console.error('Session validation error during request:', error);
      // Treat validation error as invalid session at runtime
      isValidSession = false; 
    }
  }

  if (!isValidSession && !isBuildPhase) { // Only redirect if it's runtime and session is invalid
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request if session is valid or if it's the build phase
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