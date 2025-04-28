import { FreeScoutBaseClient } from './base-client.service';
import {
  Customer,
  CustomerInput,
  CustomerUpdate,
  CustomerListResponse,
  CustomerSearchResponse,
  CustomerHistory,
  SocialProfile,
  Organization,
} from '../types/customer';

export class CustomerService extends FreeScoutBaseClient {
  /**
   * List customers with optional filters
   */
  async listCustomers(params?: {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: string;
    organizationId?: number;
  }): Promise<CustomerListResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<CustomerListResponse>(
      `/customers?${queryParams.toString()}`
    );
  }

  /**
   * Get a single customer by ID
   */
  async getCustomer(id: number): Promise<Customer> {
    return this.request<Customer>(`/customers/${id}`);
  }

  /**
   * Create a new customer
   */
  async createCustomer(data: CustomerInput): Promise<Customer> {
    return this.request<Customer>('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Update an existing customer
   */
  async updateCustomer(
    id: number,
    data: CustomerUpdate
  ): Promise<Customer> {
    return this.request<Customer>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Delete a customer
   */
  async deleteCustomer(id: number): Promise<void> {
    await this.request(`/customers/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Search customers
   */
  async searchCustomers(query: string): Promise<CustomerSearchResponse> {
    return this.request<CustomerSearchResponse>(
      `/customers/search?query=${encodeURIComponent(query)}`
    );
  }

  /**
   * Get customer conversations
   */
  async getCustomerConversations(id: number): Promise<any[]> {
    return this.request<any[]>(`/customers/${id}/conversations`);
  }

  /**
   * Manage customer tags
   */
  async manageTags(
    id: number,
    tags: string[]
  ): Promise<string[]> {
    return this.request<string[]>(`/customers/${id}/tags`, {
      method: 'PUT',
      body: JSON.stringify({ tags }),
    });
  }

  /**
   * Manage customer custom fields
   */
  async manageCustomFields(
    id: number,
    customFields: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.request<Record<string, any>>(`/customers/${id}/custom-fields`, {
      method: 'PUT',
      body: JSON.stringify({ customFields }),
    });
  }

  /**
   * Manage customer social profiles
   */
  async manageSocialProfiles(
    id: number,
    socialProfiles: SocialProfile[]
  ): Promise<SocialProfile[]> {
    return this.request<SocialProfile[]>(`/customers/${id}/social-profiles`, {
      method: 'PUT',
      body: JSON.stringify({ socialProfiles }),
    });
  }

  /**
   * Manage customer organization
   */
  async manageOrganization(
    id: number,
    organizationId: number
  ): Promise<Organization> {
    return this.request<Organization>(`/customers/${id}/organization`, {
      method: 'PUT',
      body: JSON.stringify({ organizationId }),
    });
  }

  /**
   * Get customer history
   */
  async getHistory(id: number): Promise<CustomerHistory> {
    return this.request<CustomerHistory>(`/customers/${id}/history`);
  }
} 