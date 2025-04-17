import { z } from 'zod';
import { schemas as commonSchemas } from './common';
import {
  enhancedStringSchema,
  enhancedEmailSchema,
  enhancedPasswordSchema,
  enhancedNameSchema,
  enhancedMessageSchema
} from '@/lib/validation';

/**
 * Form field type schema
 */
export const formFieldTypeSchema = z.enum(['text', 'email', 'password', 'number', 'tel', 'url']);
export type FormFieldType = z.infer<typeof formFieldTypeSchema>;

/**
 * Form field validation schema
 */
export const formFieldValidationSchema = z.object({
  pattern: z.instanceof(RegExp).optional(),
  minLength: z.number().int().positive().optional(),
  maxLength: z.number().int().positive().optional(),
  custom: z.function().args(z.string()).returns(z.string().nullable()).optional()
});

/**
 * Form field schema
 */
export const formFieldSchema = z.object({
  name: enhancedStringSchema(1, 50),
  label: enhancedStringSchema(1, 100),
  type: formFieldTypeSchema,
  required: z.boolean().optional(),
  placeholder: enhancedStringSchema(1, 100).optional(),
  validation: formFieldValidationSchema.optional()
});

export type FormField = z.infer<typeof formFieldSchema>;

/**
 * Form state schema
 */
export const formStateSchema = <T extends z.ZodType>(valuesSchema: T) =>
  z.object({
    values: valuesSchema,
    errors: z.record(z.string()).optional(),
    touched: z.record(z.boolean()).optional(),
    isSubmitting: z.boolean(),
    submitError: commonSchemas.errorResponse.optional()
  });

export type FormState<T extends z.ZodType> = z.infer<ReturnType<typeof formStateSchema<T>>>;

/**
 * Register form data schema
 */
export const registerFormDataSchema = z.object({
  name: enhancedNameSchema,
  email: enhancedEmailSchema,
  password: enhancedPasswordSchema,
  confirmPassword: enhancedPasswordSchema,
  company: enhancedStringSchema(1, 100).optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export type RegisterFormData = z.infer<typeof registerFormDataSchema>;

/**
 * Login form data schema
 */
export const loginFormDataSchema = z.object({
  email: enhancedEmailSchema,
  password: enhancedPasswordSchema,
  rememberMe: z.boolean().optional()
});

export type LoginFormData = z.infer<typeof loginFormDataSchema>;

/**
 * Contact form data schema
 */
export const contactFormDataSchema = z.object({
  name: enhancedNameSchema,
  email: enhancedEmailSchema,
  subject: enhancedStringSchema(1, 200),
  message: enhancedMessageSchema
});

export type ContactFormData = z.infer<typeof contactFormDataSchema>;

/**
 * Document upload form data schema
 */
export const documentUploadFormDataSchema = z.object({
  // Use conditional check for File type to avoid server-side errors
  file: typeof window !== 'undefined' ? z.instanceof(File) : z.any(),
  description: enhancedStringSchema(1, 500).optional(),
  tags: z.array(enhancedStringSchema(1, 50)).optional()
});

export type DocumentUploadFormData = z.infer<typeof documentUploadFormDataSchema>;

/**
 * Form validation result schema
 */
export const formValidationResultSchema = z.object({
  isValid: z.boolean(),
  errors: z.record(z.string()).optional()
});

export type FormValidationResult = z.infer<typeof formValidationResultSchema>;

// Export all form schemas for runtime validation
export const formSchemas = {
  fieldType: formFieldTypeSchema,
  fieldValidation: formFieldValidationSchema,
  field: formFieldSchema,
  state: formStateSchema,
  registerFormData: registerFormDataSchema,
  loginFormData: loginFormDataSchema,
  contactFormData: contactFormDataSchema,
  documentUploadFormData: documentUploadFormDataSchema,
  validationResult: formValidationResultSchema
}; 