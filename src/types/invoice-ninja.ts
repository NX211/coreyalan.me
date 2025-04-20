import { z } from 'zod';

/**
 * Invoice Ninja configuration schema
 */
export const invoiceNinjaConfigSchema = z.object({
  baseUrl: z.string().url(),
  apiToken: z.string().min(1),
  apiSecret: z.string().min(1),
});

export type InvoiceNinjaConfig = z.infer<typeof invoiceNinjaConfigSchema>;

/**
 * Invoice Ninja token schema
 */
export const invoiceNinjaTokenSchema = z.object({
  access_token: z.string().min(1),
  token_type: z.string().min(1),
  expires_in: z.number().int().positive(),
  refresh_token: z.string().min(1),
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
  contacts: z.array(z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().min(1).max(50),
    is_primary: z.boolean(),
  })),
  settings: z.object({
    language_id: z.string().min(1),
    currency_id: z.string().min(1),
  }),
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

// Pagination parameters
export const paginationParamsSchema = z.object({
  per_page: z.number().int().positive().optional(),
  page: z.number().int().positive().optional(),
  include: z.string().optional(),
  sort: z.string().optional(),
  filter: z.string().optional(),
});

export type PaginationParams = z.infer<typeof paginationParamsSchema>;

// Invoice schema
export const invoiceNinjaInvoiceSchema = z.object({
  id: z.string().min(1),
  number: z.string().min(1),
  status: z.enum(['draft', 'sent', 'paid', 'overdue']),
  amount: z.number().positive(),
  balance: z.number().positive(),
  client_id: z.string().min(1),
  date: z.string().datetime(),
  due_date: z.string().datetime(),
  line_items: z.array(z.object({
    product_key: z.string().min(1),
    notes: z.string().optional(),
    cost: z.number().positive(),
    quantity: z.number().positive(),
    tax_name1: z.string().optional(),
    tax_rate1: z.number().optional(),
  })),
});

export type InvoiceNinjaInvoice = z.infer<typeof invoiceNinjaInvoiceSchema>;

// Quote schema
export const invoiceNinjaQuoteSchema = z.object({
  id: z.string().min(1),
  number: z.string().min(1),
  status: z.enum(['draft', 'sent', 'approved', 'expired']),
  amount: z.number().positive(),
  client_id: z.string().min(1),
  date: z.string().datetime(),
  valid_until: z.string().datetime(),
  line_items: z.array(z.object({
    product_key: z.string().min(1),
    notes: z.string().optional(),
    cost: z.number().positive(),
    quantity: z.number().positive(),
    tax_name1: z.string().optional(),
    tax_rate1: z.number().optional(),
  })),
});

export type InvoiceNinjaQuote = z.infer<typeof invoiceNinjaQuoteSchema>;

// Payment schema
export const invoiceNinjaPaymentSchema = z.object({
  id: z.string().min(1),
  amount: z.number().positive(),
  date: z.string().datetime(),
  client_id: z.string().min(1),
  invoice_id: z.string().min(1),
  type_id: z.string().min(1),
  transaction_reference: z.string().optional(),
});

export type InvoiceNinjaPayment = z.infer<typeof invoiceNinjaPaymentSchema>;

// Task schema
export const invoiceNinjaTaskSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  client_id: z.string().min(1),
  project_id: z.string().min(1).optional(),
  time_log: z.string().optional(),
  is_running: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  is_invoiced: z.boolean().optional(),
  invoice_id: z.string().min(1).optional(),
  status_id: z.string().min(1).optional(),
  status_sort_order: z.number().int().optional(),
  status_color: z.string().optional(),
  status_name: z.string().optional(),
  custom_value1: z.string().optional(),
  custom_value2: z.string().optional(),
  custom_value3: z.string().optional(),
  custom_value4: z.string().optional(),
  rate: z.number().positive().optional(),
  number: z.string().optional(),
  duration: z.number().int().positive().optional(),
  start_time: z.string().datetime().optional(),
  end_time: z.string().datetime().optional(),
  date: z.string().datetime(),
  created_at: z.number().int().positive(),
  updated_at: z.number().int().positive(),
  archived_at: z.number().int().positive().optional(),
  is_date_based: z.boolean().optional(),
  status_order: z.number().int().optional(),
  assigned_user_id: z.string().min(1).optional(),
  user_id: z.string().min(1),
  documents: z.array(z.string()).optional(),
});

export type InvoiceNinjaTask = z.infer<typeof invoiceNinjaTaskSchema>;

// Task status schema
export const invoiceNinjaTaskStatusSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  color: z.string().min(1),
  sort_order: z.number().int(),
  is_deleted: z.boolean().optional(),
  created_at: z.number().int().positive(),
  updated_at: z.number().int().positive(),
});

export type InvoiceNinjaTaskStatus = z.infer<typeof invoiceNinjaTaskStatusSchema>;

export interface InvoiceNinjaProject {
  id: string;
  name: string;
  client_id: string;
  description?: string;
  is_deleted: boolean;
  archived_at?: string;
  created_at: string;
  updated_at: string;
  number: string;
  color?: string;
  budgeted_hours?: number;
  task_rate?: number;
  due_date?: string;
  private_notes?: string;
  public_notes?: string;
  custom_value1?: string;
  custom_value2?: string;
  custom_value3?: string;
  custom_value4?: string;
  documents?: any[];
  tasks?: InvoiceNinjaTask[];
}

export interface InvoiceNinjaVendor {
  id: string;
  name: string;
  website?: string;
  phone?: string;
  email?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country_id?: string;
  is_deleted: boolean;
  archived_at?: string;
  created_at: string;
  updated_at: string;
  number: string;
  vat_number?: string;
  id_number?: string;
  custom_value1?: string;
  custom_value2?: string;
  custom_value3?: string;
  custom_value4?: string;
  documents?: any[];
}

export interface InvoiceNinjaProduct {
  id: string;
  product_key: string;
  notes?: string;
  cost: number;
  price: number;
  quantity: number;
  tax_name1?: string;
  tax_rate1?: number;
  tax_name2?: string;
  tax_rate2?: number;
  tax_name3?: string;
  tax_rate3?: number;
  is_deleted: boolean;
  archived_at?: string;
  created_at: string;
  updated_at: string;
  custom_value1?: string;
  custom_value2?: string;
  custom_value3?: string;
  custom_value4?: string;
  documents?: any[];
}

export interface InvoiceNinjaExpense {
  id: string;
  amount: number;
  vendor_id: string;
  client_id?: string;
  category_id?: string;
  expense_date: string;
  payment_date?: string;
  payment_type_id?: string;
  private_notes?: string;
  public_notes?: string;
  tax_name1?: string;
  tax_rate1?: number;
  tax_name2?: string;
  tax_rate2?: number;
  tax_name3?: string;
  tax_rate3?: number;
  is_deleted: boolean;
  archived_at?: string;
  created_at: string;
  updated_at: string;
  number: string;
  custom_value1?: string;
  custom_value2?: string;
  custom_value3?: string;
  custom_value4?: string;
  documents?: any[];
}

export interface InvoiceNinjaUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  signature?: string;
  avatar?: string;
  is_deleted: boolean;
  archived_at?: string;
  created_at: string;
  updated_at: string;
  custom_value1?: string;
  custom_value2?: string;
  custom_value3?: string;
  custom_value4?: string;
  documents?: any[];
  oauth_provider_id?: string;
  oauth_user_id?: string;
  google_2fa_secret?: string;
  google_2fa_phone?: string;
  is_locked?: boolean;
  last_login?: string;
  failed_logins?: number;
  has_password?: boolean;
  oauth_user_token?: string;
  oauth_user_refresh_token?: string;
  oauth_user_token_expiry?: string;
  oauth_user_token_secret?: string;
  oauth_user_token_secret_expiry?: string;
  oauth_user_token_type?: string;
  oauth_user_token_scope?: string;
  oauth_user_token_created_at?: string;
  oauth_user_token_updated_at?: string;
  oauth_user_token_deleted_at?: string;
  oauth_user_token_is_deleted?: boolean;
  oauth_user_token_is_archived?: boolean;
  oauth_user_token_archived_at?: string;
  oauth_user_token_custom_value1?: string;
  oauth_user_token_custom_value2?: string;
  oauth_user_token_custom_value3?: string;
  oauth_user_token_custom_value4?: string;
  oauth_user_token_documents?: any[];
}

// Export all schemas for runtime validation
export const schemas = {
  config: invoiceNinjaConfigSchema,
  token: invoiceNinjaTokenSchema,
  contact: invoiceNinjaContactSchema,
  client: invoiceNinjaClientSchema,
  invoice: invoiceNinjaInvoiceSchema,
  quote: invoiceNinjaQuoteSchema,
  payment: invoiceNinjaPaymentSchema,
  error: invoiceNinjaErrorSchema,
  pagination: paginationParamsSchema,
  task: invoiceNinjaTaskSchema,
  taskStatus: invoiceNinjaTaskStatusSchema,
}; 