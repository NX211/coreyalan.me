import { FreeScoutBaseClient } from './base-client';
import { Conversation, ConversationStatus, ConversationType } from '../types';

export class ConversationService extends FreeScoutBaseClient {
  async listConversations(params: {
    page?: number;
    perPage?: number;
    status?: ConversationStatus;
    type?: ConversationType;
    mailboxId?: number;
    assigneeId?: number;
    customerId?: number;
    tag?: string;
  } = {}): Promise<Conversation[]> {
    const response = await this.get<Conversation[]>('/conversations', params);
    return response.data;
  }

  async getConversation(id: number): Promise<Conversation> {
    const response = await this.get<Conversation>(`/conversations/${id}`);
    return response.data;
  }

  async createConversation(data: {
    subject: string;
    body: string;
    customerEmail: string;
    mailboxId: number;
    type?: ConversationType;
    assigneeId?: number;
    tags?: string[];
    customFields?: Record<string, any>;
  }): Promise<Conversation> {
    const response = await this.post<Conversation>('/conversations', data);
    return response.data;
  }

  async updateConversation(
    id: number,
    data: {
      subject?: string;
      status?: ConversationStatus;
      assigneeId?: number;
      tags?: string[];
      customFields?: Record<string, any>;
    }
  ): Promise<Conversation> {
    const response = await this.put<Conversation>(`/conversations/${id}`, data);
    return response.data;
  }

  async deleteConversation(id: number): Promise<void> {
    await this.delete<void>(`/conversations/${id}`);
  }

  async addNote(conversationId: number, body: string): Promise<void> {
    await this.post<void>(`/conversations/${conversationId}/notes`, { body });
  }

  async addAttachment(
    conversationId: number,
    file: File,
    fileName: string
  ): Promise<void> {
    const formData = new FormData();
    formData.append('file', file, fileName);
    await this.post<void>(`/conversations/${conversationId}/attachments`, formData);
  }

  async forwardConversation(
    conversationId: number,
    data: {
      to: string;
      subject: string;
      body: string;
    }
  ): Promise<void> {
    await this.post<void>(`/conversations/${conversationId}/forward`, data);
  }

  async mergeConversations(
    sourceId: number,
    targetId: number
  ): Promise<Conversation> {
    const response = await this.post<Conversation>(
      `/conversations/${sourceId}/merge`,
      { targetId }
    );
    return response.data;
  }

  async splitConversation(
    conversationId: number,
    data: {
      subject: string;
      body: string;
      customerEmail: string;
    }
  ): Promise<Conversation> {
    const response = await this.post<Conversation>(
      `/conversations/${conversationId}/split`,
      data
    );
    return response.data;
  }

  async getConversationParticipants(conversationId: number): Promise<{
    customers: Array<{ id: number; email: string; name: string }>;
    users: Array<{ id: number; email: string; name: string }>;
  }> {
    const response = await this.get<{
      customers: Array<{ id: number; email: string; name: string }>;
      users: Array<{ id: number; email: string; name: string }>;
    }>(`/conversations/${conversationId}/participants`);
    return response.data;
  }

  async addParticipant(
    conversationId: number,
    data: {
      type: 'customer' | 'user';
      id: number;
    }
  ): Promise<void> {
    await this.post<void>(`/conversations/${conversationId}/participants`, data);
  }

  async removeParticipant(
    conversationId: number,
    data: {
      type: 'customer' | 'user';
      id: number;
    }
  ): Promise<void> {
    await this.delete<void>(
      `/conversations/${conversationId}/participants?type=${data.type}&id=${data.id}`
    );
  }

  async getConversationMetrics(conversationId: number): Promise<{
    responseTime: number;
    resolutionTime: number;
    firstResponseTime: number;
    messagesCount: number;
    participantsCount: number;
  }> {
    const response = await this.get<{
      responseTime: number;
      resolutionTime: number;
      firstResponseTime: number;
      messagesCount: number;
      participantsCount: number;
    }>(`/conversations/${conversationId}/metrics`);
    return response.data;
  }

  async getConversationTimeline(conversationId: number): Promise<Array<{
    type: string;
    timestamp: string;
    data: any;
  }>> {
    const response = await this.get<Array<{
      type: string;
      timestamp: string;
      data: any;
    }>>(`/conversations/${conversationId}/timeline`);
    return response.data;
  }

  async exportConversation(conversationId: number): Promise<Blob> {
    const response = await fetch(
      `${this.config.baseUrl}/conversations/${conversationId}/export`,
      {
        headers: this.getAuthHeaders(),
      }
    );
    return response.blob();
  }
} 