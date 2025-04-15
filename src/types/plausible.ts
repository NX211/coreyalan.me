import { z } from 'zod';

/**
 * Plausible options schema
 */
export const plausibleOptionsSchema = z.object({
  callback: z.function().returns(z.void()).optional(),
  props: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
  revenue: z.object({
    currency: z.string(),
    amount: z.number()
  }).optional()
});

export type PlausibleOptions = z.infer<typeof plausibleOptionsSchema>;

// Export all schemas for runtime validation
export const schemas = {
  options: plausibleOptionsSchema
}; 