import { z } from 'zod';
import { User, Document, ProjectInfo, ProjectFeature, ErrorResponse, SuccessResponse, schemas } from './common';
import { RegisterFormData, LoginFormData, ContactFormData, DocumentUploadFormData, formSchemas } from './forms';

/**
 * Standard API response schema
 */
export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) => 
  z.object({
    data: dataSchema,
    status: z.number().int().min(100).max(599),
    message: z.string().optional()
  });

export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema>>;

/**
 * API error schema
 */
export const apiErrorSchema = z.object({
  name: z.string(),
  message: z.string(),
  status: z.number().int().min(400).max(599).optional(),
  code: z.string().optional(),
  details: z.record(z.unknown()).optional()
});

export type ApiError = z.infer<typeof apiErrorSchema>;

/**
 * HTTP method type
 */
export const apiMethodSchema = z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
export type ApiMethod = z.infer<typeof apiMethodSchema>;

/**
 * API configuration schema
 */
export const apiConfigSchema = z.object({
  baseUrl: z.string().url(),
  headers: z.record(z.string()).optional(),
  timeout: z.number().int().positive().optional(),
  withCredentials: z.boolean().optional()
});

export type ApiConfig = z.infer<typeof apiConfigSchema>;

/**
 * Authentication API schema
 */
export const authApiSchema = z.object({
  register: z.function().args(z.object({ data: formSchemas.registerFormData })).returns(z.promise(apiResponseSchema(schemas.user))),
  login: z.function().args(z.object({ data: formSchemas.loginFormData })).returns(z.promise(apiResponseSchema(schemas.user))),
  logout: z.function().returns(z.promise(apiResponseSchema(z.void()))),
  refreshToken: z.function().returns(z.promise(apiResponseSchema(z.string())))
});

export type AuthApi = z.infer<typeof authApiSchema>;

/**
 * Documents API schema
 */
export const documentsApiSchema = z.object({
  upload: z.function().args(z.object({ data: formSchemas.documentUploadFormData })).returns(z.promise(apiResponseSchema(schemas.document))),
  list: z.function().returns(z.promise(apiResponseSchema(z.array(schemas.document)))),
  get: z.function().args(z.object({ id: z.string() })).returns(z.promise(apiResponseSchema(schemas.document))),
  delete: z.function().args(z.object({ id: z.string() })).returns(z.promise(apiResponseSchema(z.void()))),
  sign: z.function().args(z.object({ id: z.string() })).returns(z.promise(apiResponseSchema(schemas.document)))
});

export type DocumentsApi = z.infer<typeof documentsApiSchema>;

/**
 * Partial project schema for create/update operations
 */
export const partialProjectSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  technologies: z.array(z.string().min(1).max(50)).optional(),
  githubUrl: z.string().url().optional(),
  type: schemas.projectType.optional(),
  // ProjectInfo specific fields
  tags: z.array(schemas.tag).optional(),
  catalogUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  // ProjectFeature specific fields
  imageUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional()
});

/**
 * Projects API schema
 */
export const projectsApiSchema = z.object({
  list: z.function().returns(z.promise(apiResponseSchema(z.array(z.union([schemas.projectInfo, schemas.projectFeature]))))),
  get: z.function().args(z.object({ id: z.string() })).returns(z.promise(apiResponseSchema(z.union([schemas.projectInfo, schemas.projectFeature])))),
  create: z.function().args(z.object({ data: partialProjectSchema })).returns(z.promise(apiResponseSchema(z.union([schemas.projectInfo, schemas.projectFeature])))),
  update: z.function().args(z.object({ id: z.string(), data: partialProjectSchema })).returns(z.promise(apiResponseSchema(z.union([schemas.projectInfo, schemas.projectFeature])))),
  delete: z.function().args(z.object({ id: z.string() })).returns(z.promise(apiResponseSchema(z.void())))
});

export type ProjectsApi = z.infer<typeof projectsApiSchema>;

/**
 * Contact API schema
 */
export const contactApiSchema = z.object({
  send: z.function().args(z.object({ data: formSchemas.contactFormData })).returns(z.promise(apiResponseSchema(z.void())))
});

export type ContactApi = z.infer<typeof contactApiSchema>;

// Export all API schemas
export const apiSchemas = {
  response: apiResponseSchema,
  error: apiErrorSchema,
  method: apiMethodSchema,
  config: apiConfigSchema,
  auth: authApiSchema,
  documents: documentsApiSchema,
  projects: projectsApiSchema,
  contact: contactApiSchema,
  partialProject: partialProjectSchema
}; 