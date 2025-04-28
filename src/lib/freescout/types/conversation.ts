export type ConversationStatus = 'active' | 'pending' | 'closed' | 'spam';
export type ConversationType = 'email' | 'phone' | 'chat';

export interface Conversation {
  id: number;
  type: ConversationType;
  subject: string;
  preview: string;
  mailboxId: number;
  customerId: number;
  userId?: number;
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  lastReplyAt?: string;
  number: number;
  folderId: number;
  source: string;
  cc: string[];
  bcc: string[];
  tags: string[];
  customFields: Record<string, any>;
}

export interface ConversationInput {
  type: ConversationType;
  subject: string;
  mailboxId: number;
  customerId: number;
  userId?: number;
  status?: ConversationStatus;
  cc?: string[];
  bcc?: string[];
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface ConversationUpdate {
  subject?: string;
  status?: ConversationStatus;
  userId?: number;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface ConversationThread {
  id: number;
  conversationId: number;
  type: 'customer' | 'agent' | 'note' | 'system';
  body: string;
  createdAt: string;
  updatedAt: string;
  userId?: number;
  customerId?: number;
  attachments: Attachment[];
}

export interface Attachment {
  id: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  createdAt: string;
}

export interface ConversationListResponse {
  conversations: Conversation[];
  total: number;
  page: number;
  perPage: number;
}

export interface ConversationTag {
  id: number;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationCustomField {
  id: number;
  name: string;
  value: any;
  type: string;
  required: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationAttachmentInput {
  fileName: string;
  fileData: string; // Base64 encoded file data
  mimeType: string;
}

export interface ConversationForwardInput {
  to: string[];
  subject?: string;
  body?: string;
  includeAttachments?: boolean;
}

export interface ConversationMergeInput {
  targetConversationId: number;
  includeThreads?: boolean;
  includeAttachments?: boolean;
}

export interface ConversationSplitInput {
  threadId: number;
  subject: string;
  body: string;
}

export interface ConversationParticipant {
  id: number;
  type: 'user' | 'customer' | 'email';
  name: string;
  email: string;
  createdAt: string;
}

export interface ConversationMetrics {
  responseTime: number;
  resolutionTime: number;
  firstResponseTime: number;
  messagesCount: number;
  attachmentsCount: number;
  participantsCount: number;
}

export interface ConversationTimeline {
  events: Array<{
    type: string;
    timestamp: string;
    user?: {
      id: number;
      name: string;
    };
    data: any;
  }>;
} 