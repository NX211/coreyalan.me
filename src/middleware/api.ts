import { NextRequest, NextResponse } from 'next/server';
import {
  ApiError,
  NotFoundError,
  ValidationError,
  AuthenticationError,
} from '@/lib/api/errors';
import { getSession } from '@/lib/server/session';

type ApiHandler = (request: NextRequest) => Promise<NextResponse>;

export function withApiErrorHandler(handler: ApiHandler) {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          { message: error.message, details: error.details },
          { status: error.statusCode }
        );
      }
      
      console.error('API error:', error);
      return NextResponse.json(
        { message: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  };
}

export function withAuth(handler: ApiHandler) {
  return async (request: NextRequest) => {
    const session = await getSession();
    if (!session) {
      throw new AuthenticationError('Not authenticated');
    }
    
    return handler(request);
  };
}

export function apiMiddleware(handler: ApiHandler): ApiHandler {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const requiresAuth = !request.nextUrl.pathname.startsWith('/api/public');

      if (requiresAuth) {
        const isValidSession = await getSession();
        if (!isValidSession) {
          throw new AuthenticationError();
        }
      }
      
      return await handler(request);
      
    } catch (error) {
      console.error('API Middleware Error:', error);
      if (error instanceof ApiError) {
        return NextResponse.json(
          { message: error.message, details: error.details },
          { status: error.statusCode }
        );
      }
      
      return NextResponse.json(
        { message: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  };
} 