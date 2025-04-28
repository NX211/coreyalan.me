import {
  InvoiceNinjaConfig,
  InvoiceNinjaClient,
  InvoiceNinjaInvoice,
  InvoiceNinjaQuote,
  InvoiceNinjaPayment,
  InvoiceNinjaError,
  PaginationParams,
  InvoiceNinjaTask,
  InvoiceNinjaTaskStatus,
  InvoiceNinjaAuthRequest,
  InvoiceNinjaAuthResponse,
  invoiceNinjaAuthResponseSchema,
  InvoiceNinjaTokenRefreshRequest,
  InvoiceNinjaTokenRefreshResponse,
  InvoiceNinjaUser,
  InvoiceNinjaToken
} from '@/types/invoice-ninja';
import { TokenStorage } from './token-storage';

export class InvoiceNinjaClientError extends Error {
  constructor(
    public error: InvoiceNinjaError,
    public statusCode: number
  ) {
    super(error.message);
    this.name = 'InvoiceNinjaClientError';
  }
}

export class InvoiceNinjaAuthError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 401
  ) {
    super(message);
    this.name = 'InvoiceNinjaAuthError';
  }
}

export class InvoiceNinjaClientService {
  private config: InvoiceNinjaConfig;
  private token: InvoiceNinjaToken | null = null;
  private tokenExpiry: Date | null = null;
  private refreshTokenPromise: Promise<boolean> | null = null;

  constructor(config: InvoiceNinjaConfig) {
    this.config = config;
    
    // Load token from storage if available (client-side only)
    if (typeof window !== 'undefined') {
      const storedToken = TokenStorage.loadToken();
      if (storedToken) {
        this.token = storedToken;
        this.tokenExpiry = new Date(Date.now() + storedToken.expires_in * 1000);
      }
    }
  }

  setToken(accessToken: string | null, refreshToken?: string): void {
    if (!accessToken) {
      this.token = null;
      this.tokenExpiry = null;
      
      // Clear from storage
      TokenStorage.clearToken();
      return;
    }

    this.token = {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600, // Default to 1 hour
      refresh_token: refreshToken || accessToken,
    };

    this.tokenExpiry = new Date(Date.now() + this.token.expires_in * 1000);
    
    // Save to storage
    TokenStorage.saveToken(this.token);
    
    // Also save creation time
    if (typeof window !== 'undefined') {
      localStorage.setItem('invoice_ninja_token_created', new Date().toISOString());
    }
  }

  getToken(): InvoiceNinjaToken | null {
    return this.token;
  }

  isTokenExpired(): boolean {
    if (!this.token || !this.tokenExpiry) return true;
    
    // Add 30-second buffer to ensure token doesn't expire during request
    return new Date(Date.now() + 30000) >= this.tokenExpiry;
  }

  /**
   * Authenticate a user with Invoice Ninja
   * @param email User email
   * @param password User password
   * @param oneTimePassword Optional one-time password for 2FA
   * @returns User data if authentication is successful
   * @throws InvoiceNinjaAuthError if authentication fails
   */
  async authenticateUser(
    email: string, 
    password: string, 
    oneTimePassword?: string
  ): Promise<InvoiceNinjaUser> {
    try {
      const authPayload: InvoiceNinjaAuthRequest = {
        email,
        password,
      };
      
      if (oneTimePassword) {
        authPayload.one_time_password = oneTimePassword;
      }
      
      const response = await fetch(`${this.config.baseUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-API-TOKEN': this.config.apiToken,
        },
        body: JSON.stringify(authPayload),
      });
      
      if (!response.ok) {
        let errorMsg = 'Authentication failed';
        
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          // If we can't parse the error, use the default message
        }
        
        throw new InvoiceNinjaAuthError(errorMsg, response.status);
      }
      
      const data = await response.json();
      
      // Validate response structure
      try {
        const authResponse = invoiceNinjaAuthResponseSchema.parse(data);
        
        // Set the token for future requests
        this.setToken(
          authResponse.data.token,
          authResponse.data.token // Use same token as refresh token until we have a proper refresh token
        );
        
        // Create a user object from the response
        const user: InvoiceNinjaUser = {
          id: authResponse.data.user.id,
          first_name: authResponse.data.user.first_name,
          last_name: authResponse.data.user.last_name,
          email: authResponse.data.user.email,
          phone: authResponse.data.user.phone || undefined,
          avatar: authResponse.data.user.avatar || undefined,
          created_at: new Date(authResponse.data.user.created_at * 1000).toISOString(),
          updated_at: new Date(authResponse.data.user.updated_at * 1000).toISOString(),
          is_deleted: false,
          custom_value1: authResponse.data.user.custom_value1 || undefined,
          custom_value2: authResponse.data.user.custom_value2 || undefined,
          custom_value3: authResponse.data.user.custom_value3 || undefined,
          custom_value4: authResponse.data.user.custom_value4 || undefined,
        };
        
        return user;
      } catch (e) {
        console.error('Failed to validate auth response:', e);
        throw new InvoiceNinjaAuthError('Invalid authentication response format', 500);
      }
    } catch (error) {
      if (error instanceof InvoiceNinjaAuthError) {
        throw error;
      }
      
      console.error('Authentication error:', error);
      throw new InvoiceNinjaAuthError(
        error instanceof Error ? error.message : 'An unexpected error occurred during authentication',
        500
      );
    }
  }

  /**
   * Refresh the access token using a refresh token
   * @returns true if token was refreshed successfully, false otherwise
   */
  async refreshToken(): Promise<boolean> {
    // If we already have a refresh in progress, return that promise
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    // If no refresh token is available, return false
    if (!this.token?.refresh_token) {
      return false;
    }

    // Create a new promise for this refresh attempt
    this.refreshTokenPromise = (async () => {
      try {
        const refreshPayload: InvoiceNinjaTokenRefreshRequest = {
          refresh_token: this.token!.refresh_token,
        };

        const response = await fetch(`${this.config.baseUrl}/api/v1/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(refreshPayload),
        });

        if (!response.ok) {
          return false;
        }

        const data = await response.json();
        this.setToken(data.token, data.refresh_token);
        this.tokenExpiry = new Date(Date.now() + (data.expires_in || 3600) * 1000);
        return true;
      } catch (error) {
        console.error('Token refresh error:', error);
        return false;
      } finally {
        this.refreshTokenPromise = null;
      }
    })();

    return this.refreshTokenPromise;
  }

  /**
   * Get the current authenticated user's profile
   * @returns User profile information
   */
  async getUserProfile(): Promise<InvoiceNinjaUser> {
    return this.fetchWithAuth<InvoiceNinjaUser>('/api/v1/users/me');
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    };

    // Use token if available, otherwise use API key
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token.access_token}`;
    } else {
      headers['X-API-TOKEN'] = this.config.apiToken;
    }

    return headers;
  }

  private buildQueryString(params?: PaginationParams): string {
    if (!params) return '';
    
    const query = new URLSearchParams();
    if (params.per_page) query.append('per_page', params.per_page.toString());
    if (params.page) query.append('page', params.page.toString());
    if (params.include) query.append('include', params.include);
    if (params.sort) query.append('sort', params.sort);
    if (params.filter) query.append('filter', params.filter);
    
    const queryString = query.toString();
    return queryString ? `?${queryString}` : '';
  }

  private async fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: PaginationParams
  ): Promise<T> {
    // If token is expired, try to refresh it
    if (this.token && this.isTokenExpired()) {
      const refreshed = await this.refreshToken();
      if (!refreshed) {
        // If refresh failed, clear the token
        this.token = null;
      }
    }

    const queryString = this.buildQueryString(params);
    const url = `${this.config.baseUrl}${endpoint}${queryString}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      // For 401 errors, clear the token
      if (response.status === 401) {
        this.token = null;
      }

      let error: InvoiceNinjaError;
      try {
        error = await response.json();
      } catch (e) {
        error = {
          message: 'Unknown error occurred',
          status_code: response.status
        };
      }
      
      throw new InvoiceNinjaClientError(error, response.status);
    }

    return response.json();
  }

  // Client Methods
  async getClients(params?: PaginationParams): Promise<InvoiceNinjaClient[]> {
    return this.fetchWithAuth<InvoiceNinjaClient[]>('/api/v1/clients', {}, params);
  }

  async getClient(clientId: string): Promise<InvoiceNinjaClient> {
    return this.fetchWithAuth<InvoiceNinjaClient>(`/api/v1/clients/${clientId}`);
  }

  async createClient(client: Omit<InvoiceNinjaClient, 'id'>): Promise<InvoiceNinjaClient> {
    return this.fetchWithAuth<InvoiceNinjaClient>('/api/v1/clients', {
      method: 'POST',
      body: JSON.stringify(client),
    });
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

  // Invoice Methods
  async getInvoices(params?: PaginationParams): Promise<InvoiceNinjaInvoice[]> {
    return this.fetchWithAuth<InvoiceNinjaInvoice[]>('/api/v1/invoices', {}, params);
  }

  async getInvoice(invoiceId: string): Promise<InvoiceNinjaInvoice> {
    return this.fetchWithAuth<InvoiceNinjaInvoice>(`/api/v1/invoices/${invoiceId}`);
  }

  async createInvoice(invoice: Partial<InvoiceNinjaInvoice>): Promise<InvoiceNinjaInvoice> {
    return this.fetchWithAuth<InvoiceNinjaInvoice>('/api/v1/invoices', {
      method: 'POST',
      body: JSON.stringify(invoice),
    });
  }

  async updateInvoice(invoiceId: string, invoice: Partial<InvoiceNinjaInvoice>): Promise<InvoiceNinjaInvoice> {
    return this.fetchWithAuth<InvoiceNinjaInvoice>(`/api/v1/invoices/${invoiceId}`, {
      method: 'PUT',
      body: JSON.stringify(invoice),
    });
  }

  async deleteInvoice(invoiceId: string): Promise<void> {
    await this.fetchWithAuth(`/api/v1/invoices/${invoiceId}`, {
      method: 'DELETE',
    });
  }

  // Quote Methods
  async getQuotes(params?: PaginationParams): Promise<InvoiceNinjaQuote[]> {
    return this.fetchWithAuth<InvoiceNinjaQuote[]>('/api/v1/quotes', {}, params);
  }

  async getQuote(quoteId: string): Promise<InvoiceNinjaQuote> {
    return this.fetchWithAuth<InvoiceNinjaQuote>(`/api/v1/quotes/${quoteId}`);
  }

  async createQuote(quote: Partial<InvoiceNinjaQuote>): Promise<InvoiceNinjaQuote> {
    return this.fetchWithAuth<InvoiceNinjaQuote>('/api/v1/quotes', {
      method: 'POST',
      body: JSON.stringify(quote),
    });
  }

  async updateQuote(quoteId: string, quote: Partial<InvoiceNinjaQuote>): Promise<InvoiceNinjaQuote> {
    return this.fetchWithAuth<InvoiceNinjaQuote>(`/api/v1/quotes/${quoteId}`, {
      method: 'PUT',
      body: JSON.stringify(quote),
    });
  }

  async deleteQuote(quoteId: string): Promise<void> {
    await this.fetchWithAuth(`/api/v1/quotes/${quoteId}`, {
      method: 'DELETE',
    });
  }

  // Payment Methods
  async getPayments(params?: PaginationParams): Promise<InvoiceNinjaPayment[]> {
    return this.fetchWithAuth<InvoiceNinjaPayment[]>('/api/v1/payments', {}, params);
  }

  async getPayment(paymentId: string): Promise<InvoiceNinjaPayment> {
    return this.fetchWithAuth<InvoiceNinjaPayment>(`/api/v1/payments/${paymentId}`);
  }

  async createPayment(payment: Partial<InvoiceNinjaPayment>): Promise<InvoiceNinjaPayment> {
    return this.fetchWithAuth<InvoiceNinjaPayment>('/api/v1/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  }

  async updatePayment(paymentId: string, payment: Partial<InvoiceNinjaPayment>): Promise<InvoiceNinjaPayment> {
    return this.fetchWithAuth<InvoiceNinjaPayment>(`/api/v1/payments/${paymentId}`, {
      method: 'PUT',
      body: JSON.stringify(payment),
    });
  }

  async deletePayment(paymentId: string): Promise<void> {
    await this.fetchWithAuth(`/api/v1/payments/${paymentId}`, {
      method: 'DELETE',
    });
  }

  // Task Methods
  async getTasks(params?: PaginationParams): Promise<InvoiceNinjaTask[]> {
    return this.fetchWithAuth<InvoiceNinjaTask[]>('/api/v1/tasks', {}, params);
  }

  async getTask(taskId: string): Promise<InvoiceNinjaTask> {
    return this.fetchWithAuth<InvoiceNinjaTask>(`/api/v1/tasks/${taskId}`);
  }

  async createTask(task: Partial<InvoiceNinjaTask>): Promise<InvoiceNinjaTask> {
    return this.fetchWithAuth<InvoiceNinjaTask>('/api/v1/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(taskId: string, task: Partial<InvoiceNinjaTask>): Promise<InvoiceNinjaTask> {
    return this.fetchWithAuth<InvoiceNinjaTask>(`/api/v1/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.fetchWithAuth(`/api/v1/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  async startTask(taskId: string): Promise<InvoiceNinjaTask> {
    return this.fetchWithAuth<InvoiceNinjaTask>(`/api/v1/tasks/${taskId}/start`, {
      method: 'POST',
    });
  }

  async stopTask(taskId: string): Promise<InvoiceNinjaTask> {
    return this.fetchWithAuth<InvoiceNinjaTask>(`/api/v1/tasks/${taskId}/stop`, {
      method: 'POST',
    });
  }

  async getTaskStatuses(params?: PaginationParams): Promise<InvoiceNinjaTaskStatus[]> {
    return this.fetchWithAuth<InvoiceNinjaTaskStatus[]>('/api/v1/task_statuses', {}, params);
  }

  async getTaskStatus(statusId: string): Promise<InvoiceNinjaTaskStatus> {
    return this.fetchWithAuth<InvoiceNinjaTaskStatus>(`/api/v1/task_statuses/${statusId}`);
  }

  async createTaskStatus(status: Partial<InvoiceNinjaTaskStatus>): Promise<InvoiceNinjaTaskStatus> {
    return this.fetchWithAuth<InvoiceNinjaTaskStatus>('/api/v1/task_statuses', {
      method: 'POST',
      body: JSON.stringify(status),
    });
  }

  async updateTaskStatus(statusId: string, status: Partial<InvoiceNinjaTaskStatus>): Promise<InvoiceNinjaTaskStatus> {
    return this.fetchWithAuth<InvoiceNinjaTaskStatus>(`/api/v1/task_statuses/${statusId}`, {
      method: 'PUT',
      body: JSON.stringify(status),
    });
  }

  async deleteTaskStatus(statusId: string): Promise<void> {
    await this.fetchWithAuth(`/api/v1/task_statuses/${statusId}`, {
      method: 'DELETE',
    });
  }
} 