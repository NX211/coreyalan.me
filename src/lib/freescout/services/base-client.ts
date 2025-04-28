import { FreeScoutAuthConfig, FreeScoutError, ApiResponse } from '../types';
import { ApiResponseSchema } from '../types';

export class FreeScoutBaseClient {
  protected config: FreeScoutAuthConfig;

  constructor(config: FreeScoutAuthConfig) {
    this.config = config;
  }

  protected getAuthHeaders(): Record<string, string> {
    switch (this.config.authMethod) {
      case 'header':
        return { 'X-FreeScout-API-Key': this.config.apiKey };
      case 'basic':
        const basicAuth = Buffer.from(`${this.config.apiKey}:`).toString('base64');
        return { Authorization: `Basic ${basicAuth}` };
      default:
        return {};
    }
  }

  private getAuthQuery(): Record<string, string> {
    return this.config.authMethod === 'query' ? { api_key: this.config.apiKey } : {};
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    const validated = ApiResponseSchema.parse(data);

    if (!response.ok) {
      throw new Error(validated.error?.message || 'An error occurred');
    }

    return validated as ApiResponse<T>;
  }

  protected async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
    const url = new URL(`${this.config.baseUrl}${endpoint}`);
    const searchParams = new URLSearchParams({
      ...this.getAuthQuery(),
      ...params,
    });
    url.search = searchParams.toString();

    const response = await fetch(url.toString(), {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  protected async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const url = new URL(`${this.config.baseUrl}${endpoint}`);
    const searchParams = new URLSearchParams(this.getAuthQuery());
    url.search = searchParams.toString();

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  protected async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const url = new URL(`${this.config.baseUrl}${endpoint}`);
    const searchParams = new URLSearchParams(this.getAuthQuery());
    url.search = searchParams.toString();

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = new URL(`${this.config.baseUrl}${endpoint}`);
    const searchParams = new URLSearchParams(this.getAuthQuery());
    url.search = searchParams.toString();

    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<T>(response);
  }
} 