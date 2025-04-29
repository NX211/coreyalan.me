import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateCsrfToken } from '@/lib/server/csrf';
import { SecurityLogger } from '@/lib/security/logger';

export async function csrfMiddleware(request: NextRequest) {
  // Skip CSRF for GET requests and allow processing
  if (request.method === 'GET') {
    return null; // Allow GET requests to proceed
  }

  // Get CSRF token from header
  const csrfToken = request.headers.get('X-CSRF-Token');
  if (!csrfToken) {
    await SecurityLogger.logCsrfViolation(request);
    return new NextResponse('CSRF token missing', { status: 403 });
  }

  // Validate the CSRF token against the session JWT
  const isValidToken = await validateCsrfToken(request);

  if (!isValidToken) {
    await SecurityLogger.logCsrfViolation(request);
    return new NextResponse('Invalid CSRF token', { status: 403 });
  }

  // CSRF check passed, allow request to proceed
  return null;
} 