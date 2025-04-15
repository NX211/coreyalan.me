import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { composeMiddleware } from './compose';
import { rateLimitMiddleware } from './rate-limit';
import { csrfMiddleware } from './csrf';
import { apiProtectionMiddleware } from './api-protection';
import { SessionService } from '@/lib/session';

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/api/public',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/callback',
];

export async function securityMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip security for public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Compose security middleware
  const middleware = composeMiddleware(
    rateLimitMiddleware,
    csrfMiddleware,
    apiProtectionMiddleware
  );

  // Create a dummy handler that just passes the request through
  const passThrough = async (req: NextRequest) => NextResponse.next();
  
  return middleware(passThrough)(request);
}

// Export security headers configuration
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
}; 