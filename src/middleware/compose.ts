import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimitMiddleware } from './rate-limit';
import { csrfMiddleware } from './csrf';
import { apiProtectionMiddleware } from './api-protection';
import { SecurityLogger } from '@/lib/security/logger';

type RequestHandler = (request: NextRequest, ...args: any[]) => Promise<NextResponse>;
type Middleware = (request: NextRequest) => Promise<NextResponse | null>;

export function composeMiddleware(...middlewares: Middleware[]) {
  return (handler: RequestHandler) => {
    return async (request: NextRequest, ...args: any[]) => {
      try {
        // Run security middleware
        for (const middleware of middlewares) {
          const response = await middleware(request);
          if (response) {
            return response;
          }
        }
        
        // Run the actual handler
        return await handler(request, ...args);
      } catch (error: any) {
        console.error('Middleware error:', error);
        await SecurityLogger.logSecurityEvent('middleware_error', request, { 
          error: error?.message || 'Unknown error',
          stack: error?.stack
        });
        return new NextResponse(
          JSON.stringify({ error: 'Internal server error' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    };
  };
}

// Export pre-composed security middleware
export const securityMiddleware = composeMiddleware(
  // rateLimitMiddleware, // Temporarily comment out
  csrfMiddleware,
  apiProtectionMiddleware
); 