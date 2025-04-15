import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { ErrorResponse } from './apiSecurity';
import { SecurityLogger } from '@/lib/security/logger';
import { z } from 'zod';

interface CustomError extends Error {
  name: string;
  details?: Record<string, unknown>;
  stack?: string;
  status?: number;
  code?: string;
}

interface ErrorDetails {
  error: string;
  stack?: string;
  path: string;
  method: string;
  code?: string;
  details?: Record<string, unknown>;
}

// Define specific error types
export class ValidationError extends Error implements CustomError {
  public status: number;
  public code: string;
  
  constructor(message: string, public details?: Record<string, unknown>) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
    this.code = 'VALIDATION_ERROR';
  }
}

export class NotFoundError extends Error implements CustomError {
  public status: number;
  public code: string;
  
  constructor(resource: string) {
    super(`Resource not found: ${resource}`);
    this.name = 'NotFoundError';
    this.status = 404;
    this.code = 'NOT_FOUND';
  }
}

export class UnauthorizedError extends Error implements CustomError {
  public status: number;
  public code: string;
  
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
    this.code = 'UNAUTHORIZED';
  }
}

export class ForbiddenError extends Error implements CustomError {
  public status: number;
  public code: string;
  
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
    this.code = 'FORBIDDEN';
  }
}

export async function errorHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: () => Promise<void>
) {
  try {
    await handler();
  } catch (error) {
    console.error('API Error:', error);

    const customError = error as CustomError;
    const status = customError.status || 500;

    // Log the error with enhanced details
    const details: ErrorDetails = {
      error: customError?.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? customError?.stack : undefined,
      path: req.url || '/',
      method: req.method || 'GET',
      code: customError?.code,
      details: customError?.details,
    };

    // Create a mock NextRequest for logging
    const mockRequest = {
      ip: req.socket.remoteAddress,
      headers: new Headers(req.headers as Record<string, string>),
      nextUrl: { pathname: req.url || '/' },
      method: req.method || 'GET',
    } as unknown as NextRequest;

    await SecurityLogger.logSecurityEvent('api_error', mockRequest, details);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const response: ErrorResponse = {
        success: false,
        error: {
          message: 'Validation error',
          code: 'VALIDATION_ERROR',
          details: {
            errors: error.errors,
            issues: error.issues,
          },
        },
      };
      return res.status(400).json(response);
    }

    // Create error response
    const response: ErrorResponse = {
      success: false,
      error: {
        message: customError.message || 'Internal server error',
        code: customError.code || 'INTERNAL_ERROR',
        ...(customError.details && { details: customError.details }),
      },
    };

    return res.status(status).json(response);
  }
} 