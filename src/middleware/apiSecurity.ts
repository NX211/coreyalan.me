import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Rate limiting configuration
const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Error response type
export type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
};

export function createErrorResponse(
  message: string,
  code?: string,
  details?: Record<string, unknown>
): ErrorResponse {
  return {
    success: false,
    error: {
      message,
      ...(code && { code }),
      ...(details && { details }),
    },
  };
}

export function apiSecurityMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Apply rate limiting
      await new Promise<void>((resolve, reject) => {
        limiter(req as unknown as Request, res as unknown as Response, ((err: unknown) => {
          if (err) reject(err);
          else resolve();
        }) as NextFunction);
      });

      // Add security headers
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');

      // Handle CORS
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.status(200).end();
        return;
      }

      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json(
          createErrorResponse('Invalid request data', 'VALIDATION_ERROR', {
            errors: error.errors,
          })
        );
      }

      res.status(500).json(
        createErrorResponse('Internal server error', 'INTERNAL_ERROR')
      );
    }
  };
} 