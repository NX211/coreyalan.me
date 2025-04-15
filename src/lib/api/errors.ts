import { z } from 'zod';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(400, message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }

  static fromZodError(error: z.ZodError): ValidationError {
    return new ValidationError('Validation failed', {
      errors: error.errors,
      issues: error.issues,
    });
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication required', details?: Record<string, unknown>) {
    super(401, message, 'UNAUTHORIZED', details);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends ApiError {
  constructor(message = 'Not authorized', details?: Record<string, unknown>) {
    super(403, message, 'FORBIDDEN', details);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string, details?: Record<string, unknown>) {
    super(404, `Resource not found: ${resource}`, 'NOT_FOUND', details);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Resource already exists', details?: Record<string, unknown>) {
    super(409, message, 'CONFLICT', details);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends ApiError {
  constructor(message = 'Too many requests', details?: Record<string, unknown>) {
    super(429, message, 'RATE_LIMIT', details);
    this.name = 'RateLimitError';
  }
}

export class DatabaseError extends ApiError {
  constructor(message = 'Database operation failed', details?: Record<string, unknown>) {
    super(500, message, 'DATABASE_ERROR', details);
    this.name = 'DatabaseError';
  }
}

export class InternalServerError extends ApiError {
  constructor(message = 'Internal server error', details?: Record<string, unknown>) {
    super(500, message, 'INTERNAL_ERROR', details);
    this.name = 'InternalServerError';
  }
}

// Type guard to check if an error is an ApiError
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

// Helper to create an error response object
export function createErrorResponse(error: unknown): {
  success: false;
  error: {
    message: string;
    code: string;
    details?: Record<string, unknown>;
  };
  status: number;
} {
  if (error instanceof ApiError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        details: error.details,
      },
      status: error.statusCode,
    };
  }

  if (error instanceof z.ZodError) {
    const validationError = ValidationError.fromZodError(error);
    return createErrorResponse(validationError);
  }

  // Handle unknown errors
  console.error('Unknown error:', error);
  const internalError = new InternalServerError(
    error instanceof Error ? error.message : 'An unexpected error occurred'
  );
  return createErrorResponse(internalError);
} 