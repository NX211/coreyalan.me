import { FreeScoutBaseClient } from './base-client.service';
import {
  Conversation,
  ConversationInput,
  ConversationUpdate,
  ConversationThread,
  ConversationListResponse,
  ConversationTag,
  ConversationCustomField,
  ConversationAttachmentInput,
  ConversationForwardInput,
  ConversationMergeInput,
  ConversationSplitInput,
  ConversationParticipant,
  ConversationMetrics,
  ConversationTimeline,
  Attachment,
} from '../types/conversation';

export class ConversationService extends FreeScoutBaseClient {
  /**
   * List conversations with optional filters
   */
  async listConversations(params?: {
    page?: number;
    perPage?: number;
    status?: string;
    mailboxId?: number;
    userId?: number;
    customerId?: number;
    folderId?: number;
    tag?: string;
  }): Promise<ConversationListResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<ConversationListResponse>(
      `/conversations?${queryParams.toString()}`
    );
  }

  /**
   * Get a single conversation by ID
   */
  async getConversation(id: number): Promise<Conversation> {
    return this.request<Conversation>(`/conversations/${id}`);
  }

  /**
   * Create a new conversation
   */
  async createConversation(data: ConversationInput): Promise<Conversation> {
    return this.request<Conversation>('/conversations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Update an existing conversation
   */
  async updateConversation(
    id: number,
    data: ConversationUpdate
  ): Promise<Conversation> {
    return this.request<Conversation>(`/conversations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Delete a conversation
   */
  async deleteConversation(id: number): Promise<void> {
    await this.request(`/conversations/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Assign a conversation to a user
   */
  async assignConversation(
    id: number,
    userId: number
  ): Promise<Conversation> {
    return this.request<Conversation>(`/conversations/${id}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ userId }),
    });
  }

  /**
   * Change conversation status
   */
  async changeConversationStatus(
    id: number,
    status: string
  ): Promise<Conversation> {
    return this.request<Conversation>(`/conversations/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  /**
   * Add a note to a conversation
   */
  async addNote(
    id: number,
    body: string
  ): Promise<ConversationThread> {
    return this.request<ConversationThread>(`/conversations/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ body }),
    });
  }

  /**
   * Get conversation threads
   */
  async getThreads(id: number): Promise<ConversationThread[]> {
    return this.request<ConversationThread[]>(`/conversations/${id}/threads`);
  }

  /**
   * Manage conversation tags
   */
  async manageTags(
    id: number,
    tags: string[]
  ): Promise<ConversationTag[]> {
    return this.request<ConversationTag[]>(`/conversations/${id}/tags`, {
      method: 'PUT',
      body: JSON.stringify({ tags }),
    });
  }

  /**
   * Manage conversation custom fields
   */
  async manageCustomFields(
    id: number,
    customFields: Record<string, any>
  ): Promise<ConversationCustomField[]> {
    return this.request<ConversationCustomField[]>(`/conversations/${id}/custom-fields`, {
      method: 'PUT',
      body: JSON.stringify({ customFields }),
    });
  }

  /**
   * Add attachment to conversation
   */
  async addAttachment(
    id: number,
    attachment: ConversationAttachmentInput
  ): Promise<Attachment> {
    return this.request<Attachment>(`/conversations/${id}/attachments`, {
      method: 'POST',
      body: JSON.stringify(attachment),
    });
  }

  /**
   * Forward conversation
   */
  async forwardConversation(
    id: number,
    data: ConversationForwardInput
  ): Promise<void> {
    await this.request(`/conversations/${id}/forward`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Merge conversations
   */
  async mergeConversation(
    id: number,
    data: ConversationMergeInput
  ): Promise<Conversation> {
    return this.request<Conversation>(`/conversations/${id}/merge`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Split conversation thread
   */
  async splitThread(
    id: number,
    data: ConversationSplitInput
  ): Promise<Conversation> {
    return this.request<Conversation>(`/conversations/${id}/split`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Get conversation participants
   */
  async getParticipants(id: number): Promise<ConversationParticipant[]> {
    return this.request<ConversationParticipant[]>(`/conversations/${id}/participants`);
  }

  /**
   * Add participant to conversation
   */
  async addParticipant(
    id: number,
    participant: { email: string; name: string }
  ): Promise<ConversationParticipant> {
    return this.request<ConversationParticipant>(`/conversations/${id}/participants`, {
      method: 'POST',
      body: JSON.stringify(participant),
    });
  }

  /**
   * Remove participant from conversation
   */
  async removeParticipant(
    id: number,
    participantId: number
  ): Promise<void> {
    await this.request(`/conversations/${id}/participants/${participantId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Get conversation metrics
   */
  async getMetrics(id: number): Promise<ConversationMetrics> {
    return this.request<ConversationMetrics>(`/conversations/${id}/metrics`);
  }

  /**
   * Get conversation timeline
   */
  async getTimeline(id: number): Promise<ConversationTimeline> {
    return this.request<ConversationTimeline>(`/conversations/${id}/timeline`);
  }

  /**
   * Export conversation
   */
  async exportConversation(id: number): Promise<Blob> {
    const response = await this.request<Response>(`/conversations/${id}/export`, {
      method: 'GET',
      headers: {
        'Accept': 'application/zip',
      },
    });
    return response.blob();
  }

  /**
   * Restore deleted conversation
   */
  async restoreConversation(id: number): Promise<Conversation> {
    return this.request<Conversation>(`/conversations/${id}/restore`, {
      method: 'POST',
    });
  }

  /**
   * Permanently delete conversation
   */
  async permanentDelete(id: number): Promise<void> {
    await this.request(`/conversations/${id}/permanent`, {
      method: 'DELETE',
    });
  }
} 