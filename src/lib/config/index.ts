import { z } from 'zod';

const configSchema = z.object({
  invoiceNinja: z.object({
    baseUrl: z.string().url(),
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
    redirectUri: z.string().url(),
  }),
});

type Config = z.infer<typeof configSchema>;

class ConfigService {
  private static instance: ConfigService;
  private config: Config;

  private constructor() {
    this.config = this.validateConfig();
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private validateConfig(): Config {
    try {
      return configSchema.parse({
        invoiceNinja: {
          baseUrl: process.env.INVOICE_NINJA_BASE_URL,
          clientId: process.env.INVOICE_NINJA_CLIENT_ID,
          clientSecret: process.env.INVOICE_NINJA_CLIENT_SECRET,
          redirectUri: process.env.INVOICE_NINJA_REDIRECT_URI,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Configuration validation failed:', error.errors);
      }
      throw new Error('Invalid configuration. Please check your environment variables.');
    }
  }

  public getConfig(): Config {
    return this.config;
  }
}

export const configService = ConfigService.getInstance(); 