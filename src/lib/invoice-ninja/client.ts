import { InvoiceNinjaConfig, InvoiceNinjaToken, InvoiceNinjaClient, InvoiceNinjaError } from '@/types/invoice-ninja';

export class InvoiceNinjaClientError extends Error {
  constructor(public error: InvoiceNinjaError) {
    super(error.message);
    this.name = 'InvoiceNinjaClientError';
  }
}

export class InvoiceNinjaClientService {
  private config: InvoiceNinjaConfig;
  private token: InvoiceNinjaToken | null = null;

  constructor(config: InvoiceNinjaConfig) {
    this.config = config;
  }

  private async fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${this.token.access_token}`,
      },
    });

    if (!response.ok) {
      const error: InvoiceNinjaError = await response.json();
      throw new InvoiceNinjaClientError(error);
    }

    return response.json();
  }

  async getOAuthUrl(): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'read write',
    });

    return `${this.config.baseUrl}/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<InvoiceNinjaToken> {
    const response = await fetch(`${this.config.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri,
        code,
      }),
    });

    if (!response.ok) {
      const error: InvoiceNinjaError = await response.json();
      throw new InvoiceNinjaClientError(error);
    }

    const token = await response.json();
    this.token = token;
    return token;
  }

  async refreshToken(): Promise<InvoiceNinjaToken> {
    if (!this.token?.refresh_token) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${this.config.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: this.token.refresh_token,
      }),
    });

    if (!response.ok) {
      const error: InvoiceNinjaError = await response.json();
      throw new InvoiceNinjaClientError(error);
    }

    const token = await response.json();
    this.token = token;
    return token;
  }

  async createClient(client: Omit<InvoiceNinjaClient, 'id'>): Promise<InvoiceNinjaClient> {
    return this.fetchWithAuth<InvoiceNinjaClient>('/api/v1/clients', {
      method: 'POST',
      body: JSON.stringify(client),
    });
  }

  async getClient(clientId: string): Promise<InvoiceNinjaClient> {
    return this.fetchWithAuth<InvoiceNinjaClient>(`/api/v1/clients/${clientId}`);
  }

  async updateClient(clientId: string, client: Partial<InvoiceNinjaClient>): Promise<InvoiceNinjaClient> {
    return this.fetchWithAuth<InvoiceNinjaClient>(`/api/v1/clients/${clientId}`, {
      method: 'PUT',
      body: JSON.stringify(client),
    });
  }

  async deleteClient(clientId: string): Promise<void> {
    await this.fetchWithAuth(`/api/v1/clients/${clientId}`, {
      method: 'DELETE',
    });
  }

  setToken(token: InvoiceNinjaToken): void {
    this.token = token;
  }

  getToken(): InvoiceNinjaToken | null {
    return this.token;
  }
} 