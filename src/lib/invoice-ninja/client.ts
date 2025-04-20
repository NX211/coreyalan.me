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
} from '@/types/invoice-ninja';

export class InvoiceNinjaClientError extends Error {
  constructor(
    public error: InvoiceNinjaError,
    public statusCode: number
  ) {
    super(error.message);
    this.name = 'InvoiceNinjaClientError';
  }
}

export class InvoiceNinjaClientService {
  private config: InvoiceNinjaConfig;
  private token: string | null = null;

  constructor(config: InvoiceNinjaConfig) {
    this.config = config;
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'X-API-SECRET': this.config.apiSecret,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    };

    // Use token if available, otherwise use API key
    if (this.token) {
      headers['X-API-TOKEN'] = this.token;
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
      const error: InvoiceNinjaError = await response.json();
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