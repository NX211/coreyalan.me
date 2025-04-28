import { FreeScoutAuthConfig, FreeScoutAuthHeaders, FreeScoutAuthQuery, FreeScoutAuthMethod } from '../types/auth';

export class FreeScoutAuthService {
  private config: FreeScoutAuthConfig;

  constructor(config: FreeScoutAuthConfig) {
    this.config = {
      method: 'header', // Default to header method
      ...config,
    };
  }

  /**
   * Get authentication headers based on the configured method
   */
  getAuthHeaders(): FreeScoutAuthHeaders {
    switch (this.config.method) {
      case 'header':
        return {
          'X-FreeScout-API-Key': this.config.apiKey,
        };
      case 'basic':
        // For basic auth, we use the API key as username and a random password
        const basicAuth = Buffer.from(`${this.config.apiKey}:random`).toString('base64');
        return {
          'Authorization': `Basic ${basicAuth}`,
        };
      default:
        return {};
    }
  }

  /**
   * Get authentication query parameters based on the configured method
   */
  getAuthQuery(): FreeScoutAuthQuery {
    if (this.config.method === 'query') {
      return {
        api_key: this.config.apiKey,
      };
    }
    return {};
  }

  /**
   * Update the authentication configuration
   */
  updateConfig(config: Partial<FreeScoutAuthConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  /**
   * Get the current authentication configuration
   */
  getConfig(): FreeScoutAuthConfig {
    return { ...this.config };
  }
} 