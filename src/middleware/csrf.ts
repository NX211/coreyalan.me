import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function csrfMiddleware(request: NextRequest) {
  // Skip CSRF for GET requests
  if (request.method === 'GET') {
    return NextResponse.next();
  }

  // Get CSRF token from header
  const csrfToken = request.headers.get('X-CSRF-Token');
  if (!csrfToken) {
    return new NextResponse('CSRF token missing', { status: 403 });
  }

  // Verify CSRF token
  const token = await getToken({ req: request });
  if (!token || token.csrfToken !== csrfToken) {
    return new NextResponse('Invalid CSRF token', { status: 403 });
  }

  return NextResponse.next();
} 