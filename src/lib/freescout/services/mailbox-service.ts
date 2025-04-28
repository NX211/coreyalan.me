import { FreeScoutBaseClient } from './base-client';
import { Mailbox } from '../types';

export class MailboxService extends FreeScoutBaseClient {
  async listMailboxes(): Promise<Mailbox[]> {
    const response = await this.get<Mailbox[]>('/mailboxes');
    return response.data;
  }

  async getMailbox(id: number): Promise<Mailbox> {
    const response = await this.get<Mailbox>(`/mailboxes/${id}`);
    return response.data;
  }

  async createMailbox(data: {
    name: string;
    email: string;
    isEnabled: boolean;
    customFields?: Record<string, any>;
    settings?: Record<string, any>;
  }): Promise<Mailbox> {
    const response = await this.post<Mailbox>('/mailboxes', data);
    return response.data;
  }

  async updateMailbox(
    id: number,
    data: {
      name?: string;
      email?: string;
      isEnabled?: boolean;
      customFields?: Record<string, any>;
      settings?: Record<string, any>;
    }
  ): Promise<Mailbox> {
    const response = await this.put<Mailbox>(`/mailboxes/${id}`, data);
    return response.data;
  }

  async deleteMailbox(id: number): Promise<void> {
    await this.delete<void>(`/mailboxes/${id}`);
  }

  async getMailboxFolders(mailboxId: number): Promise<Array<{
    id: number;
    name: string;
    type: string;
    totalCount: number;
    unreadCount: number;
  }>> {
    const response = await this.get<Array<{
      id: number;
      name: string;
      type: string;
      totalCount: number;
      unreadCount: number;
    }>>(`/mailboxes/${mailboxId}/folders`);
    return response.data;
  }

  async getMailboxConversations(
    mailboxId: number,
    params: {
      page?: number;
      perPage?: number;
      status?: string;
      folderId?: number;
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
    }>>(`/mailboxes/${mailboxId}/conversations`, params);
    return response.data;
  }

  async manageMailboxCustomFields(
    mailboxId: number,
    customFields: Record<string, any>
  ): Promise<Mailbox> {
    const response = await this.put<Mailbox>(
      `/mailboxes/${mailboxId}/custom-fields`,
      { customFields }
    );
    return response.data;
  }

  async manageMailboxSettings(
    mailboxId: number,
    settings: Record<string, any>
  ): Promise<Mailbox> {
    const response = await this.put<Mailbox>(
      `/mailboxes/${mailboxId}/settings`,
      { settings }
    );
    return response.data;
  }

  async manageMailboxAutoReplies(
    mailboxId: number,
    autoReplies: {
      enabled: boolean;
      subject?: string;
      message?: string;
      schedule?: {
        startTime?: string;
        endTime?: string;
        timezone?: string;
      };
    }
  ): Promise<Mailbox> {
    const response = await this.put<Mailbox>(
      `/mailboxes/${mailboxId}/auto-replies`,
      { autoReplies }
    );
    return response.data;
  }

  async getMailboxStatistics(mailboxId: number): Promise<{
    totalConversations: number;
    openConversations: number;
    closedConversations: number;
    averageResponseTime: number;
    averageResolutionTime: number;
  }> {
    const response = await this.get<{
      totalConversations: number;
      openConversations: number;
      closedConversations: number;
      averageResponseTime: number;
      averageResolutionTime: number;
    }>(`/mailboxes/${mailboxId}/statistics`);
    return response.data;
  }

  async getMailboxFoldersStructure(mailboxId: number): Promise<Array<{
    id: number;
    name: string;
    type: string;
    children: Array<{
      id: number;
      name: string;
      type: string;
    }>;
  }>> {
    const response = await this.get<Array<{
      id: number;
      name: string;
      type: string;
      children: Array<{
        id: number;
        name: string;
        type: string;
      }>;
    }>>(`/mailboxes/${mailboxId}/folders/structure`);
    return response.data;
  }
} 