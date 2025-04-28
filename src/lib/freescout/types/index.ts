import { z } from 'zod';

// Base Types
export const FreeScoutErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
});

export type FreeScoutError = z.infer<typeof FreeScoutErrorSchema>;

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any(),
  error: FreeScoutErrorSchema.optional(),
});

export type ApiResponse<T> = z.infer<typeof ApiResponseSchema> & {
  data: T;
};

// Authentication Types
export const FreeScoutAuthConfigSchema = z.object({
  apiKey: z.string(),
  baseUrl: z.string().url(),
  authMethod: z.enum(['header', 'query', 'basic']),
});

export type FreeScoutAuthConfig = z.infer<typeof FreeScoutAuthConfigSchema>;
export type FreeScoutAuthMethod = 'header' | 'query' | 'basic';

// Conversation Types
export const ConversationStatusSchema = z.enum([
  'active',
  'pending',
  'closed',
  'spam',
]);

export const ConversationTypeSchema = z.enum([
  'email',
  'phone',
  'chat',
  'note',
]);

export const ConversationThreadSchema = z.object({
  id: z.number(),
  conversationId: z.number(),
  body: z.string(),
  type: ConversationTypeSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.number().nullable(),
  customerId: z.number().nullable(),
  hasAttachments: z.boolean(),
});

export const ConversationTagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

export const ConversationCustomFieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.any(),
  type: z.string(),
});

export const ConversationSchema = z.object({
  id: z.number(),
  number: z.number(),
  subject: z.string(),
  preview: z.string(),
  mailboxId: z.number(),
  assigneeId: z.number().nullable(),
  status: ConversationStatusSchema,
  type: ConversationTypeSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  closedAt: z.string().datetime().nullable(),
  customerId: z.number(),
  customerEmail: z.string().email(),
  customerName: z.string(),
  hasAttachments: z.boolean(),
  tags: z.array(ConversationTagSchema),
  customFields: z.array(ConversationCustomFieldSchema),
  threads: z.array(ConversationThreadSchema),
});

export type Conversation = z.infer<typeof ConversationSchema>;
export type ConversationStatus = z.infer<typeof ConversationStatusSchema>;
export type ConversationType = z.infer<typeof ConversationTypeSchema>;
export type ConversationThread = z.infer<typeof ConversationThreadSchema>;
export type ConversationTag = z.infer<typeof ConversationTagSchema>;
export type ConversationCustomField = z.infer<typeof ConversationCustomFieldSchema>;

// Customer Types
export const CustomerTagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

export const CustomerCustomFieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.any(),
  type: z.string(),
});

export const CustomerSocialProfileSchema = z.object({
  id: z.number(),
  type: z.string(),
  url: z.string().url(),
  username: z.string(),
});

export const CustomerOrganizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  domain: z.string().optional(),
  industry: z.string().optional(),
  size: z.string().optional(),
  customFields: z.array(CustomerCustomFieldSchema),
});

export const CustomerSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  photoUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  customFields: z.array(CustomerCustomFieldSchema),
  socialProfiles: z.array(CustomerSocialProfileSchema),
  organization: CustomerOrganizationSchema.nullable(),
  tags: z.array(CustomerTagSchema),
});

export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerTag = z.infer<typeof CustomerTagSchema>;
export type CustomerCustomField = z.infer<typeof CustomerCustomFieldSchema>;
export type CustomerSocialProfile = z.infer<typeof CustomerSocialProfileSchema>;
export type CustomerOrganization = z.infer<typeof CustomerOrganizationSchema>;

// Mailbox Types
export const MailboxFolderSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  totalCount: z.number(),
  unreadCount: z.number(),
});

export const MailboxCustomFieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.any(),
  type: z.string(),
});

export const MailboxSettingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    desktop: z.boolean(),
  }),
  signature: z.string(),
  autoReply: z.object({
    enabled: z.boolean(),
    subject: z.string(),
    message: z.string(),
  }),
});

export const MailboxAutoReplySchema = z.object({
  enabled: z.boolean(),
  subject: z.string(),
  message: z.string(),
  schedule: z.object({
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    timezone: z.string(),
  }).optional(),
});

export const MailboxSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  isEnabled: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  customFields: z.array(MailboxCustomFieldSchema),
  settings: MailboxSettingsSchema,
  folders: z.array(MailboxFolderSchema),
  autoReply: MailboxAutoReplySchema.optional(),
});

export type Mailbox = z.infer<typeof MailboxSchema>;
export type MailboxFolder = z.infer<typeof MailboxFolderSchema>;
export type MailboxCustomField = z.infer<typeof MailboxCustomFieldSchema>;
export type MailboxSettings = z.infer<typeof MailboxSettingsSchema>;
export type MailboxAutoReply = z.infer<typeof MailboxAutoReplySchema>;

// User Types
export const UserRoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  permissions: z.array(z.string()),
});

export const UserPermissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const UserSettingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    desktop: z.boolean(),
    mobile: z.boolean(),
    sound: z.boolean(),
  }),
  timezone: z.string(),
  language: z.string(),
});

export const UserNotificationSchema = z.object({
  id: z.number(),
  type: z.string(),
  message: z.string(),
  read: z.boolean(),
  createdAt: z.string().datetime(),
});

export const UserCustomFieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.any(),
  type: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: UserRoleSchema,
  isEnabled: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  customFields: z.array(UserCustomFieldSchema),
  settings: UserSettingsSchema,
  notifications: z.array(UserNotificationSchema),
  permissions: z.array(UserPermissionSchema),
});

export type User = z.infer<typeof UserSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type UserPermission = z.infer<typeof UserPermissionSchema>;
export type UserSettings = z.infer<typeof UserSettingsSchema>;
export type UserNotification = z.infer<typeof UserNotificationSchema>;
export type UserCustomField = z.infer<typeof UserCustomFieldSchema>;

// Webhook Types
export const WebhookEventTypeSchema = z.enum([
  'conversation.created',
  'conversation.updated',
  'conversation.deleted',
  'customer.created',
  'customer.updated',
  'customer.deleted',
]);

export const WebhookEventSchema = z.object({
  id: z.number(),
  type: WebhookEventTypeSchema,
  payload: z.any(),
  createdAt: z.string().datetime(),
});

export const WebhookPayloadSchema = z.object({
  event: WebhookEventSchema,
  signature: z.string(),
  timestamp: z.string().datetime(),
});

export const WebhookSecuritySchema = z.object({
  headers: z.record(z.string()),
  description: z.string(),
});

export const WebhookSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  events: z.array(WebhookEventTypeSchema),
  isEnabled: z.boolean(),
  secret: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  security: WebhookSecuritySchema,
});

export type Webhook = z.infer<typeof WebhookSchema>;
export type WebhookEvent = z.infer<typeof WebhookEventSchema>;
export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>;
export type WebhookEventType = z.infer<typeof WebhookEventTypeSchema>;
export type WebhookSecurity = z.infer<typeof WebhookSecuritySchema>;

// Hook Return Types
export type UseFreeScoutHook<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: FreeScoutError | undefined;
  refetch: () => Promise<{ data: T | undefined; error: FreeScoutError | undefined }>;
};

export type UseFreeScoutMutationHook<T, V> = {
  mutate: (variables: V) => void;
  mutateAsync: (variables: V) => Promise<T>;
  isLoading: boolean;
  isError: boolean;
  error: FreeScoutError | undefined;
  reset: () => void;
};

export interface FreeScoutRole {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoleInput {
  name: string;
  description: string;
  permissions: string[];
}

export interface RoleUpdate {
  name?: string;
  description?: string;
  permissions?: string[];
} 