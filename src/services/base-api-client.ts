import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface PaginationParams {
  page?: number;
  per_page?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export class BaseApiClient {
  protected client: AxiosInstance;

  constructor(baseURL: string, apiToken: string, apiSecret: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'X-API-TOKEN': apiToken,
        'X-API-SECRET': apiSecret,
        'Content-Type': 'application/json',
      },
    });
  }

  protected async request<T>(
    method: string,
    url: string,
    config: Partial<AxiosRequestConfig> = {}
  ): Promise<{ data: T }> {
    try {
      const response = await this.client.request<T>({
        method,
        url,
        ...config,
      });
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || 'An error occurred'
        );
      }
      throw error;
    }
  }
} 