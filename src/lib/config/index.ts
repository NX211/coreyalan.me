import { z } from 'zod';

const configSchema = z.object({
  invoiceNinja: z.object({
    // Allow undefined during build, but require at runtime
    baseUrl: z.string().url().optional(), 
    clientId: z.string().min(1).optional(),
    clientSecret: z.string().min(1).optional(),
    redirectUri: z.string().url().optional(),
  }),
});

// Separate schema for runtime validation
const runtimeConfigSchema = z.object({
  invoiceNinja: z.object({
    baseUrl: z.string().url(),
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
    redirectUri: z.string().url(),
  }),
});

type Config = z.infer<typeof runtimeConfigSchema>;

class ConfigService {
  private static instance: ConfigService;
  private config: Config | null = null; // Allow null initially
  private isRuntimeValidated: boolean = false;

  private constructor() {
    // Initial parse allows undefined values (e.g., during build)
    const initialConfig = this.parseInitialConfig();
    // Store potentially incomplete config, but don't throw yet
    // Runtime validation will happen on first getConfig call
    this.config = initialConfig as Config; // Cast for now, validated later
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private parseInitialConfig() {
    // Use the looser schema for initial parsing
    return configSchema.parse({
      invoiceNinja: {
        baseUrl: process.env.INVOICE_NINJA_BASE_URL,
        clientId: process.env.INVOICE_NINJA_CLIENT_ID,
        clientSecret: process.env.INVOICE_NINJA_CLIENT_SECRET,
        redirectUri: process.env.INVOICE_NINJA_REDIRECT_URI,
      },
    });
  }

  private validateRuntimeConfig(): Config {
    if (this.isRuntimeValidated && this.config) {
      return this.config;
    }
    try {
      const parsedConfig = runtimeConfigSchema.parse({
        invoiceNinja: {
          baseUrl: process.env.INVOICE_NINJA_BASE_URL,
          clientId: process.env.INVOICE_NINJA_CLIENT_ID,
          clientSecret: process.env.INVOICE_NINJA_CLIENT_SECRET,
          redirectUri: process.env.INVOICE_NINJA_REDIRECT_URI,
        },
      });
      this.config = parsedConfig;
      this.isRuntimeValidated = true;
      return this.config;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Runtime configuration validation failed:', error.errors);
      }
      // Throw fatal error only at runtime
      throw new Error('Invalid runtime configuration. Please check your environment variables.');
    }
  }

  public getConfig(): Config {
    // Validate on first access if not already done
    if (!this.isRuntimeValidated) {
        return this.validateRuntimeConfig();
    }
    // Should not be null after validation
    if (!this.config) {
        throw new Error('Configuration accessed before validation completed successfully.');
    }
    return this.config;
  }
}

export const configService = ConfigService.getInstance(); 