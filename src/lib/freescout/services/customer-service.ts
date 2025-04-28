import { FreeScoutBaseClient } from './base-client';
import { Customer } from '../types';

export class CustomerService extends FreeScoutBaseClient {
  async listCustomers(params: {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: string;
  } = {}): Promise<Customer[]> {
    const response = await this.get<Customer[]>('/customers', params);
    return response.data;
  }

  async getCustomer(id: number): Promise<Customer> {
    const response = await this.get<Customer>(`/customers/${id}`);
    return response.data;
  }

  async createCustomer(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    photoUrl?: string;
    customFields?: Record<string, any>;
    socialProfiles?: Record<string, string>;
    organization?: {
      id: number;
      name: string;
    };
  }): Promise<Customer> {
    const response = await this.post<Customer>('/customers', data);
    return response.data;
  }

  async updateCustomer(
    id: number,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      photoUrl?: string;
      customFields?: Record<string, any>;
      socialProfiles?: Record<string, string>;
      organization?: {
        id: number;
        name: string;
      };
    }
  ): Promise<Customer> {
    const response = await this.put<Customer>(`/customers/${id}`, data);
    return response.data;
  }

  async deleteCustomer(id: number): Promise<void> {
    await this.delete<void>(`/customers/${id}`);
  }

  async searchCustomers(query: string): Promise<Customer[]> {
    const response = await this.get<Customer[]>('/customers/search', { q: query });
    return response.data;
  }

  async getCustomerConversations(
    customerId: number,
    params: {
      page?: number;
      perPage?: number;
      status?: string;
    } = {}
  ): Promise<Array<{
    id: number;
    subject: string;
    status: string;
    createdAt: string;
  }>> {
    const response = await this.get<Array<{
      id: number;
      subject: string;
      status: string;
      createdAt: string;
    }>>(`/customers/${customerId}/conversations`, params);
    return response.data;
  }

  async manageCustomerTags(
    customerId: number,
    tags: string[]
  ): Promise<Customer> {
    const response = await this.put<Customer>(`/customers/${customerId}/tags`, {
      tags,
    });
    return response.data;
  }

  async manageCustomerCustomFields(
    customerId: number,
    customFields: Record<string, any>
  ): Promise<Customer> {
    const response = await this.put<Customer>(
      `/customers/${customerId}/custom-fields`,
      { customFields }
    );
    return response.data;
  }

  async manageCustomerSocialProfiles(
    customerId: number,
    socialProfiles: Record<string, string>
  ): Promise<Customer> {
    const response = await this.put<Customer>(
      `/customers/${customerId}/social-profiles`,
      { socialProfiles }
    );
    return response.data;
  }

  async manageCustomerOrganization(
    customerId: number,
    organization: {
      id: number;
      name: string;
    }
  ): Promise<Customer> {
    const response = await this.put<Customer>(
      `/customers/${customerId}/organization`,
      { organization }
    );
    return response.data;
  }

  async getCustomerHistory(customerId: number): Promise<Array<{
    type: string;
    timestamp: string;
    data: any;
  }>> {
    const response = await this.get<Array<{
      type: string;
      timestamp: string;
      data: any;
    }>>(`/customers/${customerId}/history`);
    return response.data;
  }
} 