import { z } from 'zod';

const envSchema = z.object({
  // Authentication
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_JWT_SECRET: z.string().min(32),

  // Database
  DATABASE_URL: z.string().url(),

  // Invoice Ninja
  INVOICE_NINJA_API_KEY: z.string().min(32),
  INVOICE_NINJA_URL: z.string().url(),
  INVOICE_NINJA_BASE_URL: z.string().url(),
  INVOICE_NINJA_CLIENT_ID: z.string(),
  INVOICE_NINJA_CLIENT_SECRET: z.string(),
  INVOICE_NINJA_REDIRECT_URI: z.string().url(),

  // OAuth2
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_DRIVE_FOLDER_ID: z.string().optional(),

  // Session
  SESSION_SECRET: z.string().min(32),
  COOKIE_SECRET: z.string().min(32),

  // Security
  CORS_ORIGIN: z.string().url(),
  RATE_LIMIT_WINDOW: z.string().transform(Number),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number),
  CSRF_SECRET: z.string().min(32),
  ALLOWED_ORIGINS: z.string().transform(str => str.split(',')),

  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
  SENTRY_DSN: z.string().url().optional(),
  SECURITY_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // Redis (for rate limiting)
  REDIS_URL: z.string().url(),
  REDIS_TOKEN: z.string(),

  // Node Environment
  NODE_ENV: z.enum(['development', 'test', 'production']),
  
  // Contact Form
  CONTACT_EMAIL: z.string().email().optional().default('corey@coreyalan.me'),
  
  // SMTP Configuration
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(val => Number(val)),
  SMTP_SECURE: z.string().transform(val => val === 'true'),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM: z.string().email().optional().default('noreply@coreyalan.me'),

  // OpenSign
  OPENSIGN_API_KEY: z.string().min(1),
});

export function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.errors);
      process.exit(1);
    }
    throw error;
  }
} 