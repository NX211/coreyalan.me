import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiError, createErrorResponse } from '@/lib/api/errors';
import { SessionService } from '@/lib/session';

type ApiHandler = (request: NextRequest) => Promise<NextResponse>;

export async function apiMiddleware(handler: ApiHandler) {
  return async (request: NextRequest) => {
    try {
      // Validate session for protected routes
      if (!request.nextUrl.pathname.startsWith('/api/public')) {
        const isValidSession = await SessionService.validateSession();
        if (!isValidSession) {
          throw new ApiError(401, 'Authentication required', 'UNAUTHORIZED');
        }
      }

      // Handle the request
      const response = await handler(request);
      return response;
    } catch (error) {
      console.error('API Error:', error);

      const errorResponse = createErrorResponse(error);
      return NextResponse.json(
        {
          success: false,
          error: errorResponse.error,
        },
        { status: errorResponse.status }
      );
    }
  };
} 