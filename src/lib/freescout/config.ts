import { FreeScoutAuthConfig } from './types/auth';

export const FREESCOUT_CONFIG: FreeScoutAuthConfig = {
  apiKey: process.env.FREESCOUT_API_KEY || '',
  baseUrl: process.env.FREESCOUT_BASE_URL || 'https://help.coreyalan.me/api',
  method: (process.env.FREESCOUT_AUTH_METHOD as 'header' | 'query' | 'basic') || 'header',
};

// Validate required environment variables
if (!FREESCOUT_CONFIG.apiKey) {
  throw new Error('FREESCOUT_API_KEY environment variable is required');
}

if (!FREESCOUT_CONFIG.baseUrl) {
  throw new Error('FREESCOUT_BASE_URL environment variable is required');
} 