import { z } from 'zod';
import { invoiceNinjaConfigSchema } from '@/types/invoice-ninja';

const configSchema = z.object({
  invoiceNinja: invoiceNinjaConfigSchema,
  // ... other config schemas
});

// Separate schema for runtime validation
const runtimeConfigSchema = z.object({
  invoiceNinja: invoiceNinjaConfigSchema,
  // ... other config schemas
});

type Config = z.infer<typeof runtimeConfigSchema>;

class ConfigService {
  private config: Config;

  constructor() {
    this.config = this.validateConfig();
  }

  private validateConfig(): Config {
    const config = {
      invoiceNinja: {
        baseUrl: process.env.INVOICE_NINJA_URL,
        apiToken: process.env.INVOICE_NINJA_API_KEY,
        apiSecret: process.env.INVOICE_NINJA_API_SECRET,
      },
      // ... other config
    };

    return runtimeConfigSchema.parse(config);
  }

  getConfig(): Config {
    return this.config;
  }
}

export const configService = new ConfigService(); 