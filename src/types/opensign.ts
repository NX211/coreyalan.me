// Base types
export interface OpenSignError {
  message: string;
  code?: string;
}

// Document types
export interface OpenSignDocument {
  id: string;
  name: string;
  status: string;
  created_at: string;
  documentUrl?: string;
}

export interface VerificationResult {
  isValid: boolean;
  details?: {
    signedBy?: string;
    signedOn?: Date;
    documentHash?: string;
  };
  error?: string;
}

// Webhook types
export interface OpenSignWebhook {
  id: string;
  url: string;
  events: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type OpenSignWebhookInput = Omit<OpenSignWebhook, 'id' | 'createdAt' | 'updatedAt'>;
export type OpenSignWebhookUpdate = Partial<OpenSignWebhookInput>;

// Webhook event types
export type WebhookEvent = 
  | 'document.created'
  | 'document.signed'
  | 'document.deleted'
  | 'template.created'
  | 'template.updated'
  | 'template.deleted';

export interface WebhookPayload {
  type: WebhookEvent;
  documentId?: string;
  templateId?: string;
  timestamp: string;
  data: Record<string, any>;
}

// Template types
export interface OpenSignTemplate {
  id: string;
  name: string;
  description?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type OpenSignTemplateInput = Omit<OpenSignTemplate, 'id' | 'createdAt' | 'updatedAt'>;
export type OpenSignTemplateUpdate = Partial<OpenSignTemplateInput>;

// User types
export interface OpenSignUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type OpenSignUserInput = Omit<OpenSignUser, 'id' | 'createdAt' | 'updatedAt'>;
export type OpenSignUserUpdate = Partial<OpenSignUserInput>;

// Contact types
export interface OpenSignContact {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  createdAt: string;
  updatedAt: string;
}

export type OpenSignContactInput = Omit<OpenSignContact, 'id' | 'createdAt' | 'updatedAt'>;
export type OpenSignContactUpdate = Partial<OpenSignContactInput>;

// Folder types
export interface OpenSignFolder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export type OpenSignFolderInput = Omit<OpenSignFolder, 'id' | 'createdAt' | 'updatedAt'>;
export type OpenSignFolderUpdate = Partial<OpenSignFolderInput>;

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: OpenSignError;
}

// Hook return types
export interface UseOpenSignHook<T> {
  data: T | null;
  isLoading: boolean;
  error: OpenSignError | null;
  mutate: () => Promise<void>;
}

export interface UseOpenSignMutationHook<T, I> {
  data: T | null;
  isLoading: boolean;
  error: OpenSignError | null;
  mutate: (input: I) => Promise<void>;
} 