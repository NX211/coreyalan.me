import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  createErrorResponse, 
  AuthenticationError,
} from '@/lib/api/errors';
import { validateSession } from '@/lib/session';

type ApiHandler = (request: NextRequest) => Promise<NextResponse>;

export function withApiAuth(handler: ApiHandler): ApiHandler {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const isValidSession = await validateSession();
      
      if (!isValidSession) {
        throw new AuthenticationError(); 
      }
      
      return await handler(request);
      
    } catch (error) {
      console.error('API Auth Middleware Error:', error);
      const errorResponsePayload = createErrorResponse(error); 
      return NextResponse.json(errorResponsePayload, { status: errorResponsePayload.status });
    }
  };
}

export function apiMiddleware(handler: ApiHandler): ApiHandler {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const requiresAuth = !request.nextUrl.pathname.startsWith('/api/public');

      if (requiresAuth) {
        const isValidSession = await validateSession();
        if (!isValidSession) {
          throw new AuthenticationError();
        }
      }
      
      return await handler(request);
      
    } catch (error) {
      console.error('API Middleware Error:', error);
      const errorResponsePayload = createErrorResponse(error);
      return NextResponse.json(errorResponsePayload, { status: errorResponsePayload.status }) as NextResponse;
    }
  };
} 