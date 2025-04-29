import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * Validates CSRF token from request against the token in the session
 * @param request - The NextRequest object
 * @returns true if token is valid, false otherwise
 */
export async function validateCsrfToken(request: NextRequest): Promise<boolean> {
  // Skip validation for GET requests
  if (request.method === 'GET') {
    return true;
  }

  // Get CSRF token from header
  const requestCsrfToken = request.headers.get('X-CSRF-Token');
  if (!requestCsrfToken) {
    return false;
  }

  // Get CSRF token from session JWT
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Compare tokens
  return token?.csrfToken === requestCsrfToken;
}

/**
 * Creates a new CSRF token for testing or debugging
 * @returns A new random CSRF token
 */
export function generateCsrfToken(): string {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
} 