import { z } from 'zod';
import { ValidationError } from '@/lib/api/errors';

// Sanitization functions
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/[&<>"']/g, '') // Remove special characters
    .replace(/\s+/g, ' '); // Normalize whitespace
};

export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const sanitizePassword = (password: string): string => {
  return password.trim();
};

// Enhanced string schema with common validations
export const enhancedStringSchema = (min: number, max: number) =>
  z.string()
    .min(min, { message: `Must be at least ${min} characters` })
    .max(max, { message: `Must be at most ${max} characters` })
    .trim();

// Enhanced email schema
export const enhancedEmailSchema = z.string()
  .email({ message: 'Invalid email address' })
  .min(5, { message: 'Email must be at least 5 characters' })
  .max(100, { message: 'Email must be at most 100 characters' })
  .toLowerCase()
  .trim();

// Enhanced password schema
export const enhancedPasswordSchema = z.string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(50, { message: 'Password must be at most 50 characters' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' });

// Enhanced name schema
export const enhancedNameSchema = enhancedStringSchema(2, 50)
  .regex(/^[a-zA-Z\s-']+$/, { message: 'Name can only contain letters, spaces, hyphens, and apostrophes' });

// Enhanced message schema
export const enhancedMessageSchema = enhancedStringSchema(10, 1000)
  .regex(/^[a-zA-Z0-9\s.,!?-]+$/, { message: 'Message can only contain letters, numbers, and basic punctuation' });

// Validation helper function
export const validateWithSchema = <T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: boolean; data?: z.infer<T>; error?: string } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      return { success: false, error: errorMessage };
    }
    return { success: false, error: 'Validation failed' };
  }
};

// Export all schemas and utilities
export const schemas = {
  string: enhancedStringSchema,
  email: enhancedEmailSchema,
  password: enhancedPasswordSchema,
  name: enhancedNameSchema,
  message: enhancedMessageSchema
};

export const validation = {
  validateWithSchema
};

// Validation utilities
export function validateSchema<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: ValidationError } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: new ValidationError('Validation failed', {
          errors: error.errors,
          issues: error.issues,
        }),
      };
    }
    return {
      success: false,
      error: new ValidationError('Validation failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
}

export function validateField<T extends z.ZodType>(
  schema: T,
  field: string,
  value: unknown
): { success: true; data: z.infer<T> } | { success: false; error: ValidationError } {
  try {
    const result = schema.parse(value);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: new ValidationError(`Invalid ${field}`, {
          field,
          errors: error.errors,
          issues: error.issues,
        }),
      };
    }
    return {
      success: false,
      error: new ValidationError(`Invalid ${field}`, {
        field,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
}

// Common validation patterns
export const validationPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[a-zA-Z\s-']+$/,
  message: /^[a-zA-Z0-9\s.,!?-]+$/
}; 