import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { validateWithSchema } from '@/lib/validation';

type ValidationSchema = z.ZodType<unknown>;

interface ValidationOptions {
  body?: ValidationSchema;
  query?: ValidationSchema;
  params?: ValidationSchema;
}

export function validateRequest(options: ValidationOptions) {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
      // Validate request body
      if (options.body && req.method !== 'GET') {
        const result = validateWithSchema(options.body, req.body);
        if (!result.success) {
          return res.status(400).json({
            success: false,
            error: result.error
          });
        }
        req.body = result.data;
      }

      // Validate query parameters
      if (options.query) {
        const result = validateWithSchema(options.query, req.query);
        if (!result.success) {
          return res.status(400).json({
            success: false,
            error: result.error
          });
        }
        req.query = result.data as { [key: string]: string | string[] };
      }

      // Validate URL parameters
      if (options.params) {
        const result = validateWithSchema(options.params, req.query);
        if (!result.success) {
          return res.status(400).json({
            success: false,
            error: result.error
          });
        }
        req.query = { ...req.query, ...(result.data as { [key: string]: string | string[] }) };
      }

      next();
    } catch (err) {
      console.error('Validation middleware error:', err);
      return res.status(500).json({
        success: false,
        error: 'Internal server error during validation'
      });
    }
  };
}

// Helper function to create validation middleware for specific routes
export function createValidationMiddleware(schema: ValidationSchema) {
  return validateRequest({ body: schema });
} 