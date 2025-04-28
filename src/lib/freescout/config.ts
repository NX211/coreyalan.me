import { getEnvVar } from '../env';

export interface FreeScoutAuthConfig {
  apiKey: string;
  baseUrl: string;
  authMethod: 'basic' | 'query' | 'header';
}

export function getFreeScoutConfig(): FreeScoutAuthConfig {
  return {
    apiKey: process.env.FREESCOUT_API_KEY || '',
    baseUrl: process.env.FREESCOUT_BASE_URL || '',
    authMethod: 'header',
  };
}

// Validate required environment variables
if (!getFreeScoutConfig().apiKey) {
  throw new Error('FREESCOUT_API_KEY environment variable is required');
}

if (!getFreeScoutConfig().baseUrl) {
  throw new Error('FREESCOUT_BASE_URL environment variable is required');
} 