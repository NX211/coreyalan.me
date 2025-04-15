import { z } from 'zod';

/**
 * Accepted MIME types for document uploads
 */
export const ACCEPTED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword'
] as const;

export type AcceptedMimeType = typeof ACCEPTED_MIME_TYPES[number];

/**
 * Maximum file size in bytes (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Document metadata schema
 */
export const documentMetadataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().max(1000).optional(),
  tags: z.array(z.string().min(1).max(50)).max(10).optional(),
});

export type DocumentMetadata = z.infer<typeof documentMetadataSchema>;

/**
 * Document upload schema with validation
 */
export const documentUploadSchema = z.object({
  document: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    })
    .refine(
      (file) => ACCEPTED_MIME_TYPES.includes(file.type as AcceptedMimeType),
      {
        message: `File type must be one of: ${ACCEPTED_MIME_TYPES.map(type => type.split('/')[1]).join(', ')}`,
      }
    ),
  metadata: documentMetadataSchema.optional(),
});

export type DocumentUpload = z.infer<typeof documentUploadSchema>;

/**
 * Document status schema
 */
export const documentStatusSchema = z.enum([
  'pending',
  'processing',
  'completed',
  'failed'
]);

export type DocumentStatus = z.infer<typeof documentStatusSchema>;

// Export all schemas for runtime validation
export const schemas = {
  metadata: documentMetadataSchema,
  upload: documentUploadSchema,
  status: documentStatusSchema
}; 