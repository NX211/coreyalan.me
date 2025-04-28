import { FreeScoutBaseClient } from './base-client';
import { User } from '../types';

export class UserService extends FreeScoutBaseClient {
  async listUsers(): Promise<User[]> {
    const response = await this.get<User[]>('/users');
    return response.data;
  }

  async getUser(id: number): Promise<User> {
    const response = await this.get<User>(`/users/${id}`);
    return response.data;
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isEnabled: boolean;
    customFields?: Record<string, any>;
    settings?: Record<string, any>;
  }): Promise<User> {
    const response = await this.post<User>('/users', data);
    return response.data;
  }

  async updateUser(
    id: number,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      role?: string;
      isEnabled?: boolean;
      customFields?: Record<string, any>;
      settings?: Record<string, any>;
    }
  ): Promise<User> {
    const response = await this.put<User>(`/users/${id}`, data);
    return response.data;
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete<void>(`/users/${id}`);
  }

  async getUserConversations(
    userId: number,
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
    }>>(`/users/${userId}/conversations`, params);
    return response.data;
  }

  async getUserPerformanceMetrics(userId: number): Promise<{
    totalConversations: number;
    openConversations: number;
    closedConversations: number;
    averageResponseTime: number;
    averageResolutionTime: number;
    satisfactionScore: number;
  }> {
    const response = await this.get<{
      totalConversations: number;
      openConversations: number;
      closedConversations: number;
      averageResponseTime: number;
      averageResolutionTime: number;
      satisfactionScore: number;
    }>(`/users/${userId}/metrics`);
    return response.data;
  }

  async manageUserRoles(
    userId: number,
    roles: string[]
  ): Promise<User> {
    const response = await this.put<User>(`/users/${userId}/roles`, {
      roles,
    });
    return response.data;
  }

  async manageUserSettings(
    userId: number,
    settings: Record<string, any>
  ): Promise<User> {
    const response = await this.put<User>(
      `/users/${userId}/settings`,
      { settings }
    );
    return response.data;
  }

  async manageUserNotifications(
    userId: number,
    notifications: {
      email?: boolean;
      desktop?: boolean;
      mobile?: boolean;
      sound?: boolean;
    }
  ): Promise<User> {
    const response = await this.put<User>(
      `/users/${userId}/notifications`,
      { notifications }
    );
    return response.data;
  }

  async manageUserCustomFields(
    userId: number,
    customFields: Record<string, any>
  ): Promise<User> {
    const response = await this.put<User>(
      `/users/${userId}/custom-fields`,
      { customFields }
    );
    return response.data;
  }

  async getUserAvailability(userId: number): Promise<{
    isAvailable: boolean;
    status: string;
    nextAvailableTime?: string;
  }> {
    const response = await this.get<{
      isAvailable: boolean;
      status: string;
      nextAvailableTime?: string;
    }>(`/users/${userId}/availability`);
    return response.data;
  }

  async getUserWorkingHours(userId: number): Promise<{
    timezone: string;
    workingDays: Array<{
      day: string;
      startTime: string;
      endTime: string;
    }>;
    holidays: Array<{
      date: string;
      name: string;
    }>;
  }> {
    const response = await this.get<{
      timezone: string;
      workingDays: Array<{
        day: string;
        startTime: string;
        endTime: string;
      }>;
      holidays: Array<{
        date: string;
        name: string;
      }>;
    }>(`/users/${userId}/working-hours`);
    return response.data;
  }
} 