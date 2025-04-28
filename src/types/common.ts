import { z } from 'zod';

/**
 * Represents a tag with a name
 */
export const tagSchema = z.object({
  name: z.string().min(1).max(50)
});

export type Tag = z.infer<typeof tagSchema>;

/**
 * Represents a navigation link with optional icon
 */
export const linkSchema = z.object({
  href: z.string().url(),
  label: z.string().min(1).max(50),
  icon: z.string().optional()
});

export type Link = z.infer<typeof linkSchema>;

/**
 * Represents an image with required and optional properties
 */
export const imageSchema = z.object({
  src: z.string().url(),
  alt: z.string().min(1).max(100),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional()
});

export type Image = z.infer<typeof imageSchema>;

/**
 * Represents a standardized error response
 */
export const errorResponseSchema = z.object({
  message: z.string().min(1),
  code: z.string().optional(),
  details: z.record(z.unknown()).optional()
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

/**
 * Represents a standardized success response with generic data
 */
export const successResponseSchema = <T extends z.ZodType>(dataSchema: T) => 
  z.object({
    data: dataSchema,
    message: z.string().optional()
  });

export type SuccessResponse<T> = z.infer<ReturnType<typeof successResponseSchema>>;

/**
 * Represents the type of project
 */
export const projectTypeSchema = z.enum(['frontend', 'backend', 'fullstack']);
export type ProjectType = z.infer<typeof projectTypeSchema>;

/**
 * Base project interface with common properties
 */
export const baseProjectSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  technologies: z.array(z.string().min(1).max(50)),
  githubUrl: z.string().url().optional(),
  type: projectTypeSchema
});

export type BaseProject = z.infer<typeof baseProjectSchema>;

/**
 * Extended project information with additional properties
 */
export const projectInfoSchema = baseProjectSchema.extend({
  tags: z.array(tagSchema),
  catalogUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  logoUrl: z.string().url().optional()
});

export type ProjectInfo = z.infer<typeof projectInfoSchema>;

/**
 * Project feature with image and live URL
 */
export const projectFeatureSchema = baseProjectSchema.extend({
  imageUrl: z.string().url(),
  liveUrl: z.string().url().optional()
});

export type ProjectFeature = z.infer<typeof projectFeatureSchema>;

/**
 * Document metadata and status
 */
export const documentSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  status: z.enum(['pending', 'signed', 'draft', 'expired']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  url: z.string().url().optional(),
  signedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional()
});

export type Document = z.infer<typeof documentSchema>;
export type DocumentStatus = Document['status'];

/**
 * User information and role
 */
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  company: z.string().max(100).optional(),
  role: z.enum(['user', 'admin']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type User = z.infer<typeof userSchema>;

/**
 * Authentication response with user and token
 */
export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string().min(1),
  expiresIn: z.number().int().positive()
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// Export all schemas for runtime validation
export const schemas = {
  tag: tagSchema,
  link: linkSchema,
  image: imageSchema,
  errorResponse: errorResponseSchema,
  successResponse: successResponseSchema,
  projectType: projectTypeSchema,
  baseProject: baseProjectSchema,
  projectInfo: projectInfoSchema,
  projectFeature: projectFeatureSchema,
  document: documentSchema,
  user: userSchema,
  authResponse: authResponseSchema
}; 