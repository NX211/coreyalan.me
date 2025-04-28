import { FreeScoutAuthService } from './auth.service';
import { FreeScoutAuthConfig } from '../types/auth';

export class FreeScoutBaseClient {
  protected authService: FreeScoutAuthService;

  constructor(config: FreeScoutAuthConfig) {
    this.authService = new FreeScoutAuthService(config);
  }

  /**
   * Make an authenticated request to the FreeScout API
   */
  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = new URL(endpoint, this.authService.getConfig().baseUrl);
    
    // Add query parameters for query-based authentication
    const queryParams = this.authService.getAuthQuery();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    // Add headers for header-based authentication
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...this.authService.getAuthHeaders(),
      ...options.headers,
    };

    const response = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `FreeScout API error: ${response.status} ${response.statusText} - ${JSON.stringify(error)}`
      );
    }

    return response.json();
  }

  /**
   * Update the authentication configuration
   */
  updateAuthConfig(config: Partial<FreeScoutAuthConfig>): void {
    this.authService.updateConfig(config);
  }
} 