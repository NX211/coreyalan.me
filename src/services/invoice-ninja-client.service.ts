import { BaseApiClient, PaginationParams } from './base-api-client';
import { invoiceNinjaExpenseSchema, invoiceNinjaUserSchema } from '../schemas/invoice-ninja';
import type { 
  InvoiceNinjaClient, 
  InvoiceNinjaContact, 
  InvoiceNinjaTask,
  InvoiceNinjaTaskStatus,
  InvoiceNinjaProject,
  InvoiceNinjaVendor,
  InvoiceNinjaProduct,
  InvoiceNinjaExpense,
  InvoiceNinjaUser
} from '../types/invoice-ninja';

export class InvoiceNinjaClientService extends BaseApiClient {
  private token: string | null = null;

  constructor() {
    super(
      process.env.INVOICE_NINJA_URL || 'https://api.invoiceninja.com/v1',
      process.env.INVOICE_NINJA_API_KEY || '',
      process.env.INVOICE_NINJA_API_SECRET || ''
    );
  }

  setToken(token: string | null): void {
    this.token = token;
    if (token) {
      this.client.defaults.headers['X-API-TOKEN'] = token;
      this.client.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
    } else {
      delete this.client.defaults.headers['X-API-TOKEN'];
      delete this.client.defaults.headers['X-Requested-With'];
    }
  }

  getToken(): string | null {
    return this.token;
  }

  // Project methods
  async listProjects(params?: PaginationParams): Promise<InvoiceNinjaProject[]> {
    const response = await this.request<InvoiceNinjaProject[]>(
      'GET',
      '/projects',
      { params }
    );
    return response.data;
  }

  async getProject(id: string): Promise<InvoiceNinjaProject> {
    const response = await this.request<InvoiceNinjaProject>(
      'GET',
      `/projects/${id}`
    );
    return response.data;
  }

  async createProject(data: Partial<InvoiceNinjaProject>): Promise<InvoiceNinjaProject> {
    const response = await this.request<InvoiceNinjaProject>(
      'POST',
      '/projects',
      { data }
    );
    return response.data;
  }

  async updateProject(id: string, data: Partial<InvoiceNinjaProject>): Promise<InvoiceNinjaProject> {
    const response = await this.request<InvoiceNinjaProject>(
      'PUT',
      `/projects/${id}`,
      { data }
    );
    return response.data;
  }

  async deleteProject(id: string): Promise<void> {
    await this.request<void>(
      'DELETE',
      `/projects/${id}`
    );
  }

  // Vendor methods
  async listVendors(params?: PaginationParams): Promise<InvoiceNinjaVendor[]> {
    const response = await this.request<InvoiceNinjaVendor[]>(
      'GET',
      '/vendors',
      { params }
    );
    return response.data;
  }

  async getVendor(id: string): Promise<InvoiceNinjaVendor> {
    const response = await this.request<InvoiceNinjaVendor>(
      'GET',
      `/vendors/${id}`
    );
    return response.data;
  }

  async createVendor(data: Partial<InvoiceNinjaVendor>): Promise<InvoiceNinjaVendor> {
    const response = await this.request<InvoiceNinjaVendor>(
      'POST',
      '/vendors',
      { data }
    );
    return response.data;
  }

  async updateVendor(id: string, data: Partial<InvoiceNinjaVendor>): Promise<InvoiceNinjaVendor> {
    const response = await this.request<InvoiceNinjaVendor>(
      'PUT',
      `/vendors/${id}`,
      { data }
    );
    return response.data;
  }

  async deleteVendor(id: string): Promise<void> {
    await this.request<void>(
      'DELETE',
      `/vendors/${id}`
    );
  }

  // Product methods
  async listProducts(params?: PaginationParams): Promise<InvoiceNinjaProduct[]> {
    const response = await this.request<InvoiceNinjaProduct[]>(
      'GET',
      '/products',
      { params }
    );
    return response.data;
  }

  async getProduct(id: string): Promise<InvoiceNinjaProduct> {
    const response = await this.request<InvoiceNinjaProduct>(
      'GET',
      `/products/${id}`
    );
    return response.data;
  }

  async createProduct(data: Partial<InvoiceNinjaProduct>): Promise<InvoiceNinjaProduct> {
    const response = await this.request<InvoiceNinjaProduct>(
      'POST',
      '/products',
      { data }
    );
    return response.data;
  }

  async updateProduct(id: string, data: Partial<InvoiceNinjaProduct>): Promise<InvoiceNinjaProduct> {
    const response = await this.request<InvoiceNinjaProduct>(
      'PUT',
      `/products/${id}`,
      { data }
    );
    return response.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.request<void>(
      'DELETE',
      `/products/${id}`
    );
  }

  // Expense methods
  async listExpenses(params?: {
    page?: number;
    perPage?: number;
    include?: string;
    filter?: string;
    status?: 'active' | 'archived' | 'deleted';
    client_id?: string;
    vendor_id?: string;
    category_id?: string;
    payment_type_id?: string;
    date_range?: string;
  }): Promise<InvoiceNinjaExpense[]> {
    const response = await this.request<InvoiceNinjaExpense[]>(
      'GET',
      '/expenses',
      { params }
    );
    return response.data;
  }

  async getExpense(id: string, params?: { include?: string }): Promise<InvoiceNinjaExpense> {
    const response = await this.request<InvoiceNinjaExpense>(
      'GET',
      `/expenses/${id}`,
      { params }
    );
    return response.data;
  }

  async createExpense(data: Partial<InvoiceNinjaExpense>): Promise<InvoiceNinjaExpense> {
    const validatedData = invoiceNinjaExpenseSchema.partial().parse(data);
    const response = await this.request<InvoiceNinjaExpense>(
      'POST',
      '/expenses',
      { data: validatedData }
    );
    return response.data;
  }

  async updateExpense(id: string, data: Partial<InvoiceNinjaExpense>): Promise<InvoiceNinjaExpense> {
    const validatedData = invoiceNinjaExpenseSchema.partial().parse(data);
    const response = await this.request<InvoiceNinjaExpense>(
      'PUT',
      `/expenses/${id}`,
      { data: validatedData }
    );
    return response.data;
  }

  async deleteExpense(id: string): Promise<void> {
    await this.request<void>(
      'DELETE',
      `/expenses/${id}`
    );
  }

  async archiveExpense(id: string): Promise<InvoiceNinjaExpense> {
    const response = await this.request<InvoiceNinjaExpense>(
      'POST',
      `/expenses/${id}/archive`
    );
    return response.data;
  }

  async restoreExpense(id: string): Promise<InvoiceNinjaExpense> {
    const response = await this.request<InvoiceNinjaExpense>(
      'POST',
      `/expenses/${id}/restore`
    );
    return response.data;
  }

  async uploadExpenseDocument(id: string, file: File): Promise<InvoiceNinjaExpense> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await this.request<InvoiceNinjaExpense>(
      'POST',
      `/expenses/${id}/upload`,
      { 
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  }

  async getExpenseCategories(): Promise<Array<{ id: string; name: string }>> {
    const response = await this.request<Array<{ id: string; name: string }>>(
      'GET',
      '/expense_categories'
    );
    return response.data;
  }

  async getPaymentTypes(): Promise<Array<{ id: string; name: string }>> {
    const response = await this.request<Array<{ id: string; name: string }>>(
      'GET',
      '/payment_types'
    );
    return response.data;
  }

  // User methods
  async listUsers(params?: PaginationParams): Promise<InvoiceNinjaUser[]> {
    const response = await this.request<InvoiceNinjaUser[]>(
      'GET',
      '/users',
      { params }
    );
    return response.data;
  }

  async getUser(id: string): Promise<InvoiceNinjaUser> {
    const response = await this.request<InvoiceNinjaUser>(
      'GET',
      `/users/${id}`
    );
    return response.data;
  }

  async createUser(data: Partial<InvoiceNinjaUser>): Promise<InvoiceNinjaUser> {
    const validatedData = invoiceNinjaUserSchema.partial().parse(data);
    const response = await this.request<InvoiceNinjaUser>(
      'POST',
      '/users',
      { data: validatedData }
    );
    return response.data;
  }

  async updateUser(id: string, data: Partial<InvoiceNinjaUser>): Promise<InvoiceNinjaUser> {
    const validatedData = invoiceNinjaUserSchema.partial().parse(data);
    const response = await this.request<InvoiceNinjaUser>(
      'PUT',
      `/users/${id}`,
      { data: validatedData }
    );
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.request<void>(
      'DELETE',
      `/users/${id}`
    );
  }

  async archiveUser(id: string): Promise<InvoiceNinjaUser> {
    const response = await this.request<InvoiceNinjaUser>(
      'POST',
      `/users/${id}/archive`
    );
    return response.data;
  }

  async restoreUser(id: string): Promise<InvoiceNinjaUser> {
    const response = await this.request<InvoiceNinjaUser>(
      'POST',
      `/users/${id}/restore`
    );
    return response.data;
  }

  async uploadUserAvatar(id: string, file: File): Promise<InvoiceNinjaUser> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await this.request<InvoiceNinjaUser>(
      'POST',
      `/users/${id}/upload`,
      { 
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  }

  /**
   * Send an invitation email to a user
   * @param id The user ID
   * @returns The response from the API
   */
  async inviteUser(id: string): Promise<{ data: InvoiceNinjaUser }> {
    return this.request('GET', `/users/${id}/invite`);
  }

  /**
   * Verify a user's email
   * @param id The user ID
   * @returns The response from the API
   */
  async verifyUser(id: string): Promise<{ data: InvoiceNinjaUser }> {
    return this.request('GET', `/users/${id}/verify`);
  }

  /**
   * Ban a user
   * @param id The user ID
   * @returns The response from the API
   */
  async banUser(id: string): Promise<{ data: InvoiceNinjaUser }> {
    return this.request('GET', `/users/${id}/ban`);
  }

  /**
   * Unban a user
   * @param id The user ID
   * @returns The response from the API
   */
  async unbanUser(id: string): Promise<{ data: InvoiceNinjaUser }> {
    return this.request('GET', `/users/${id}/unban`);
  }

  /**
   * Impersonate a user
   * @param id The user ID
   * @returns The response from the API
   */
  async impersonateUser(id: string): Promise<{ data: InvoiceNinjaUser }> {
    return this.request('GET', `/users/${id}/impersonate`);
  }

  /**
   * Authenticate a user with email and password
   * @param email The user's email
   * @param password The user's password
   * @returns The authenticated user or null if authentication fails
   */
  async authenticateUser(email: string, password: string): Promise<InvoiceNinjaUser | null> {
    try {
      const response = await this.request<InvoiceNinjaUser>(
        'POST',
        '/users/authenticate',
        {
          data: {
            email,
            password,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Authentication failed:', error);
      return null;
    }
  }
} 