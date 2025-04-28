import { useCallback, useEffect, useState } from 'react';
import { FreeScoutClient, createFreeScoutClient, getFreeScoutClient } from '../client';
import { FreeScoutAuthConfig, ConversationStatus, ConversationType, WebhookEventType, UseFreeScoutHook, UseFreeScoutMutationHook, Conversation, Customer, Mailbox, User, Webhook, FreeScoutRole } from '../types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Base hooks
export const useFreeScout = (config: FreeScoutAuthConfig): FreeScoutClient => {
  const [client, setClient] = useState<FreeScoutClient | null>(null);

  useEffect(() => {
    const instance = createFreeScoutClient(config);
    setClient(instance);
  }, [config]);

  if (!client) {
    throw new Error('FreeScout client not initialized');
  }

  return client;
};

export const useFreeScoutAuth = (): UseFreeScoutHook<FreeScoutAuthConfig> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['auth'],
    queryFn: () => client.auth.getConfig(),
  }) as unknown as UseFreeScoutHook<FreeScoutAuthConfig>;
};

// Conversation hooks
export const useConversations = (params: {
  page?: number;
  perPage?: number;
  status?: ConversationStatus;
  type?: ConversationType;
  mailboxId?: number;
  assigneeId?: number;
  customerId?: number;
  tag?: string;
} = {}): UseFreeScoutHook<Conversation[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['conversations', params],
    queryFn: () => client.conversations.listConversations(params),
  }) as unknown as UseFreeScoutHook<Conversation[]>;
};

export const useConversation = (id: number): UseFreeScoutHook<Conversation> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['conversation', id],
    queryFn: () => client.conversations.getConversation(id),
  }) as unknown as UseFreeScoutHook<Conversation>;
};

export const useCreateConversation = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      subject: string;
      body: string;
      customerEmail: string;
      mailboxId: number;
      type?: 'email' | 'phone' | 'chat' | 'note';
      assigneeId?: number;
      tags?: string[];
      customFields?: Record<string, any>;
    }) => client.conversations.createConversation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useUpdateConversation = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: {
      id: number;
      data: {
        subject?: string;
        status?: ConversationStatus;
        assigneeId?: number;
        tags?: string[];
        customFields?: Record<string, any>;
      };
    }) => client.conversations.updateConversation(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversation', id] });
    },
  });
};

export const useDeleteConversation = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await client.conversations.deleteConversation(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useConversationTags = (id: number): UseFreeScoutHook<any[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['conversation', id, 'tags'],
    queryFn: () => client.conversations.getConversation(id).then(conv => conv.tags),
  }) as UseFreeScoutHook<any[]>;
};

export const useConversationCustomFields = (id: number): UseFreeScoutHook<any[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['conversation', id, 'custom-fields'],
    queryFn: () => client.conversations.getConversation(id).then(conv => conv.customFields),
  }) as UseFreeScoutHook<any[]>;
};

export const useConversationAttachments = (id: number): UseFreeScoutHook<any[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['conversation', id, 'attachments'],
    queryFn: () => client.conversations.getConversation(id).then(conv => conv.hasAttachments),
  }) as UseFreeScoutHook<any[]>;
};

// Customer hooks
export const useCustomers = (params: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
} = {}): UseFreeScoutHook<Customer[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => client.customers.listCustomers(params),
  }) as unknown as UseFreeScoutHook<Customer[]>;
};

export const useCustomer = (id: number): UseFreeScoutHook<Customer> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => client.customers.getCustomer(id),
  }) as unknown as UseFreeScoutHook<Customer>;
};

export const useCreateCustomer = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
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
    }) => client.customers.createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useUpdateCustomer = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: {
      id: number;
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
      };
    }) => client.customers.updateCustomer(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', id] });
    },
  });
};

export const useDeleteCustomer = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await client.customers.deleteCustomer(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useCustomerTags = (id: number): UseFreeScoutHook<any[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['customer', id, 'tags'],
    queryFn: () => client.customers.getCustomer(id).then(customer => customer.tags),
  }) as UseFreeScoutHook<any[]>;
};

export const useCustomerCustomFields = (id: number): UseFreeScoutHook<any[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['customer', id, 'custom-fields'],
    queryFn: () => client.customers.getCustomer(id).then(customer => customer.customFields),
  }) as UseFreeScoutHook<any[]>;
};

export const useCustomerSocialProfiles = (id: number): UseFreeScoutHook<any[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['customer', id, 'social-profiles'],
    queryFn: () => client.customers.getCustomer(id).then(customer => customer.socialProfiles),
  }) as UseFreeScoutHook<any[]>;
};

// Mailbox hooks
export const useMailboxes = (): UseFreeScoutHook<Mailbox[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['mailboxes'],
    queryFn: () => client.mailboxes.listMailboxes(),
  }) as unknown as UseFreeScoutHook<Mailbox[]>;
};

export const useMailbox = (id: number): UseFreeScoutHook<Mailbox> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['mailbox', id],
    queryFn: () => client.mailboxes.getMailbox(id),
  }) as unknown as UseFreeScoutHook<Mailbox>;
};

export const useCreateMailbox = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      isEnabled: boolean;
      customFields?: Record<string, any>;
      settings?: Record<string, any>;
    }) => client.mailboxes.createMailbox(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mailboxes'] });
    },
  });
};

export const useUpdateMailbox = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: {
      id: number;
      data: {
        name?: string;
        email?: string;
        isEnabled?: boolean;
        customFields?: Record<string, any>;
        settings?: Record<string, any>;
      };
    }) => client.mailboxes.updateMailbox(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['mailboxes'] });
      queryClient.invalidateQueries({ queryKey: ['mailbox', id] });
    },
  });
};

export const useDeleteMailbox = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await client.mailboxes.deleteMailbox(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mailboxes'] });
    },
  });
};

export const useMailboxFolders = (id: number): UseFreeScoutHook<any[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['mailbox', id, 'folders'],
    queryFn: () => client.mailboxes.getMailbox(id).then(mailbox => mailbox.folders),
  }) as UseFreeScoutHook<any[]>;
};

export const useMailboxSettings = (id: number): UseFreeScoutHook<any> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['mailbox', id, 'settings'],
    queryFn: () => client.mailboxes.getMailbox(id).then(mailbox => mailbox.settings),
  }) as UseFreeScoutHook<any>;
};

export const useMailboxAutoReplies = (id: number): UseFreeScoutHook<any> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['mailbox', id, 'auto-replies'],
    queryFn: () => client.mailboxes.getMailbox(id).then(mailbox => mailbox.autoReply),
  }) as UseFreeScoutHook<any>;
};

// User hooks
export const useUsers = (): UseFreeScoutHook<User[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['users'],
    queryFn: () => client.users.listUsers(),
  }) as unknown as UseFreeScoutHook<User[]>;
};

export const useUser = (id: number): UseFreeScoutHook<User> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => client.users.getUser(id),
  }) as unknown as UseFreeScoutHook<User>;
};

export const useCreateUser = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      isEnabled: boolean;
      customFields?: Record<string, any>;
      settings?: Record<string, any>;
    }) => client.users.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: {
      id: number;
      data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        role?: string;
        isEnabled?: boolean;
        customFields?: Record<string, any>;
        settings?: Record<string, any>;
      };
    }) => client.users.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};

export const useDeleteUser = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await client.users.deleteUser(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUserSpecificRoles = (id: number): UseFreeScoutHook<string[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['user', id, 'roles'],
    queryFn: () => client.users.getUser(id).then(user => [user.role]),
  }) as UseFreeScoutHook<string[]>;
};

export const useUserSettings = (id: number): UseFreeScoutHook<any> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['user', id, 'settings'],
    queryFn: () => client.users.getUser(id).then(user => user.settings),
  }) as UseFreeScoutHook<any>;
};

export const useUserNotifications = (id: number): UseFreeScoutHook<any[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['user', id, 'notifications'],
    queryFn: () => client.users.getUser(id).then(user => user.notifications),
  }) as UseFreeScoutHook<any[]>;
};

// Webhook hooks
export const useWebhooks = (): UseFreeScoutHook<Webhook[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['webhooks'],
    queryFn: () => client.webhooks.listWebhooks(),
  }) as unknown as UseFreeScoutHook<Webhook[]>;
};

export const useWebhook = (id: number): UseFreeScoutHook<Webhook> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['webhook', id],
    queryFn: () => client.webhooks.getWebhook(id),
  }) as unknown as UseFreeScoutHook<Webhook>;
};

export const useCreateWebhook = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      url: string;
      events: WebhookEventType[];
      isEnabled: boolean;
      secret?: string;
    }) => client.webhooks.createWebhook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
    },
  });
};

export const useUpdateWebhook = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: {
      id: number;
      data: {
        url?: string;
        events?: WebhookEventType[];
        isEnabled?: boolean;
      };
    }) => client.webhooks.updateWebhook(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      queryClient.invalidateQueries({ queryKey: ['webhook', id] });
    },
  });
};

export const useDeleteWebhook = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await client.webhooks.deleteWebhook(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
    },
  });
};

export const useTestWebhook = () => {
  const client = getFreeScoutClient();
  return useMutation({
    mutationFn: (id: number) => client.webhooks.testWebhook(id),
  });
};

export const useWebhookEvents = (id: number): UseFreeScoutHook<any[]> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['webhook', id, 'events'],
    queryFn: () => client.webhooks.getWebhook(id).then(webhook => webhook.events),
  }) as UseFreeScoutHook<any[]>;
};

export const useWebhookSecurity = (id: number): UseFreeScoutHook<any> => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['webhook', id, 'security'],
    queryFn: () => client.webhooks.getWebhook(id).then(webhook => webhook.security),
  }) as UseFreeScoutHook<any>;
};

export const useUserRoles = () => {
  const client = getFreeScoutClient();
  return useQuery({
    queryKey: ['user-roles'],
    queryFn: () => client.users.listUsers().then(users => 
      users.map(user => ({
        id: user.id,
        name: user.role,
        description: `Role for ${user.firstName} ${user.lastName}`,
        permissions: user.permissions || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }))
    ),
  }) as unknown as UseFreeScoutHook<FreeScoutRole[]>;
};

export const useCreateUserRole = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; permissions: string[] }) => {
      const user = await client.users.createUser({
        firstName: data.name,
        lastName: data.name,
        email: `${data.name}@example.com`,
        role: data.name,
        isEnabled: true,
      });
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-roles'] });
    },
  });
};

export const useUpdateUserRole = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { name: string; permissions: string[] } }) => {
      const user = await client.users.updateUser(id, {
        role: data.name,
      });
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-roles'] });
    },
  });
};

export const useDeleteUserRole = () => {
  const client = getFreeScoutClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await client.users.updateUser(id, {
        role: 'user',
      });
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-roles'] });
    },
  });
}; 