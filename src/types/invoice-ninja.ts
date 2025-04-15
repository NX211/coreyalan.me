import { z } from 'zod';

/**
 * Invoice Ninja configuration schema
 */
export const invoiceNinjaConfigSchema = z.object({
  baseUrl: z.string().url(),
  clientId: z.string().min(1),
  clientSecret: z.string().min(1),
  redirectUri: z.string().url()
});

export type InvoiceNinjaConfig = z.infer<typeof invoiceNinjaConfigSchema>;

/**
 * Invoice Ninja token schema
 */
export const invoiceNinjaTokenSchema = z.object({
  access_token: z.string().min(1),
  token_type: z.string().min(1),
  expires_in: z.number().int().positive(),
  refresh_token: z.string().min(1)
});

export type InvoiceNinjaToken = z.infer<typeof invoiceNinjaTokenSchema>;

/**
 * Invoice Ninja contact schema
 */
export const invoiceNinjaContactSchema = z.object({
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(1).max(50),
  is_primary: z.boolean()
});

export type InvoiceNinjaContact = z.infer<typeof invoiceNinjaContactSchema>;

/**
 * Invoice Ninja client settings schema
 */
export const invoiceNinjaClientSettingsSchema = z.object({
  language_id: z.string().min(1),
  currency_id: z.string().min(1)
});

/**
 * Invoice Ninja client schema
 */
export const invoiceNinjaClientSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(1).max(50),
  website: z.string().url().optional(),
  address1: z.string().min(1).max(200),
  address2: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  postal_code: z.string().min(1).max(20),
  country_id: z.string().min(1),
  contacts: z.array(invoiceNinjaContactSchema),
  settings: invoiceNinjaClientSettingsSchema
});

export type InvoiceNinjaClient = z.infer<typeof invoiceNinjaClientSchema>;

/**
 * Invoice Ninja error schema
 */
export const invoiceNinjaErrorSchema = z.object({
  message: z.string().min(1),
  errors: z.record(z.array(z.string())).optional(),
  status_code: z.number().int().positive()
});

export type InvoiceNinjaError = z.infer<typeof invoiceNinjaErrorSchema>;

// Export all schemas for runtime validation
export const schemas = {
  config: invoiceNinjaConfigSchema,
  token: invoiceNinjaTokenSchema,
  contact: invoiceNinjaContactSchema,
  client: invoiceNinjaClientSchema,
  error: invoiceNinjaErrorSchema
}; 