import { FreeScoutBaseClient } from './base-client';
import { Webhook, WebhookEventType } from '../types';

export class WebhookService extends FreeScoutBaseClient {
  async listWebhooks(): Promise<Webhook[]> {
    const response = await this.get<Webhook[]>('/webhooks');
    return response.data;
  }

  async getWebhook(id: number): Promise<Webhook> {
    const response = await this.get<Webhook>(`/webhooks/${id}`);
    return response.data;
  }

  async createWebhook(data: {
    url: string;
    events: WebhookEventType[];
    isEnabled: boolean;
  }): Promise<Webhook> {
    const response = await this.post<Webhook>('/webhooks', data);
    return response.data;
  }

  async updateWebhook(
    id: number,
    data: {
      url?: string;
      events?: WebhookEventType[];
      isEnabled?: boolean;
    }
  ): Promise<Webhook> {
    const response = await this.put<Webhook>(`/webhooks/${id}`, data);
    return response.data;
  }

  async deleteWebhook(id: number): Promise<void> {
    await this.delete<void>(`/webhooks/${id}`);
  }

  async testWebhook(id: number): Promise<{
    success: boolean;
    statusCode: number;
    response: string;
  }> {
    const response = await this.post<{
      success: boolean;
      statusCode: number;
      response: string;
    }>(`/webhooks/${id}/test`, {});
    return response.data;
  }

  async verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): Promise<boolean> {
    const response = await this.post<{ isValid: boolean }>('/webhooks/verify', {
      payload,
      signature,
      secret,
    });
    return response.data.isValid;
  }

  async retryWebhook(id: number): Promise<void> {
    await this.post<void>(`/webhooks/${id}/retry`, {});
  }

  async filterWebhookEvents(
    events: WebhookEventType[],
    filters: {
      conversationStatus?: string[];
      customerTags?: string[];
      userRoles?: string[];
    }
  ): Promise<WebhookEventType[]> {
    const response = await this.post<WebhookEventType[]>('/webhooks/filter', {
      events,
      filters,
    });
    return response.data;
  }

  async validateWebhookPayload(
    payload: any,
    eventType: WebhookEventType
  ): Promise<{
    isValid: boolean;
    errors?: string[];
  }> {
    const response = await this.post<{
      isValid: boolean;
      errors?: string[];
    }>('/webhooks/validate', {
      payload,
      eventType,
    });
    return response.data;
  }

  async getWebhookSecurityHeaders(): Promise<{
    headers: Record<string, string>;
    description: string;
  }> {
    const response = await this.get<{
      headers: Record<string, string>;
      description: string;
    }>('/webhooks/security-headers');
    return response.data;
  }
} 