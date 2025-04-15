import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function apiProtectionMiddleware(request: NextRequest) {
  // Skip protection for public routes
  if (request.nextUrl.pathname.startsWith('/api/public')) {
    return NextResponse.next();
  }

  // Get session token
  const token = await getToken({ req: request });

  // Check if user is authenticated
  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Check if user has required role
  if (request.nextUrl.pathname.startsWith('/api/admin') && token.role !== 'admin') {
    return new NextResponse(
      JSON.stringify({ error: 'Forbidden' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return NextResponse.next();
} 