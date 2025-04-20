import { useState, useCallback } from 'react';
import {
  OpenSignTemplate,
  OpenSignTemplateInput,
  OpenSignTemplateUpdate,
  OpenSignUser,
  OpenSignUserInput,
  OpenSignUserUpdate,
  OpenSignContact,
  OpenSignContactInput,
  OpenSignContactUpdate,
  OpenSignFolder,
  OpenSignFolderInput,
  OpenSignFolderUpdate,
  OpenSignDocument,
  VerificationResult,
  OpenSignWebhook,
  OpenSignWebhookInput,
  OpenSignWebhookUpdate,
  UseOpenSignHook,
  UseOpenSignMutationHook,
} from '@/types/opensign';

// Base hook for fetching data
function useOpenSignFetch<T>(endpoint: string): UseOpenSignHook<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/opensign/${endpoint}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  return { data, isLoading, error, mutate };
}

// Base hook for mutations
function useOpenSignMutation<T, I>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE'
): UseOpenSignMutationHook<T, I> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (input: I) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/opensign/${endpoint}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        });
        if (!response.ok) {
          throw new Error('Failed to perform operation');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, method]
  );

  return { data, isLoading, error, mutate };
}

// Template hooks
export function useTemplates() {
  return useOpenSignFetch<OpenSignTemplate[]>('templates');
}

export function useTemplate(id: string) {
  return useOpenSignFetch<OpenSignTemplate>(`templates/${id}`);
}

export function useCreateTemplate() {
  return useOpenSignMutation<OpenSignTemplate, OpenSignTemplateInput>(
    'templates',
    'POST'
  );
}

export function useUpdateTemplate(id: string) {
  return useOpenSignMutation<OpenSignTemplate, OpenSignTemplateUpdate>(
    `templates/${id}`,
    'PUT'
  );
}

export function useDeleteTemplate(id: string) {
  return useOpenSignMutation<void, void>(`templates/${id}`, 'DELETE');
}

// User hooks
export function useUsers() {
  return useOpenSignFetch<OpenSignUser[]>('users');
}

export function useUser(id: string) {
  return useOpenSignFetch<OpenSignUser>(`users/${id}`);
}

export function useCreateUser() {
  return useOpenSignMutation<OpenSignUser, OpenSignUserInput>('users', 'POST');
}

export function useUpdateUser(id: string) {
  return useOpenSignMutation<OpenSignUser, OpenSignUserUpdate>(
    `users/${id}`,
    'PUT'
  );
}

export function useDeleteUser(id: string) {
  return useOpenSignMutation<void, void>(`users/${id}`, 'DELETE');
}

// Contact hooks
export function useContacts() {
  return useOpenSignFetch<OpenSignContact[]>('contacts');
}

export function useContact(id: string) {
  return useOpenSignFetch<OpenSignContact>(`contacts/${id}`);
}

export function useCreateContact() {
  return useOpenSignMutation<OpenSignContact, OpenSignContactInput>(
    'contacts',
    'POST'
  );
}

export function useUpdateContact(id: string) {
  return useOpenSignMutation<OpenSignContact, OpenSignContactUpdate>(
    `contacts/${id}`,
    'PUT'
  );
}

export function useDeleteContact(id: string) {
  return useOpenSignMutation<void, void>(`contacts/${id}`, 'DELETE');
}

// Folder hooks
export function useFolders() {
  return useOpenSignFetch<OpenSignFolder[]>('folders');
}

export function useFolder(id: string) {
  return useOpenSignFetch<OpenSignFolder>(`folders/${id}`);
}

export function useCreateFolder() {
  return useOpenSignMutation<OpenSignFolder, OpenSignFolderInput>(
    'folders',
    'POST'
  );
}

export function useUpdateFolder(id: string) {
  return useOpenSignMutation<OpenSignFolder, OpenSignFolderUpdate>(
    `folders/${id}`,
    'PUT'
  );
}

export function useDeleteFolder(id: string) {
  return useOpenSignMutation<void, void>(`folders/${id}`, 'DELETE');
}

// Document hooks
export function useDocumentStatus(documentId: string) {
  return useOpenSignFetch<OpenSignDocument>(`documents/${documentId}/status`);
}

export function useDocumentVerification(documentId: string) {
  return useOpenSignFetch<VerificationResult>(`documents/${documentId}/verify`);
}

export function useSigningUrl(documentId: string) {
  return useOpenSignFetch<{ url: string }>(`documents/${documentId}/signing-url`);
}

// Webhook hooks
export function useWebhooks() {
  return useOpenSignFetch<OpenSignWebhook[]>('webhooks');
}

export function useWebhook(id: string) {
  return useOpenSignFetch<OpenSignWebhook>(`webhooks/${id}`);
}

export function useCreateWebhook() {
  return useOpenSignMutation<OpenSignWebhook, OpenSignWebhookInput>(
    'webhooks',
    'POST'
  );
}

export function useUpdateWebhook(id: string) {
  return useOpenSignMutation<OpenSignWebhook, OpenSignWebhookUpdate>(
    `webhooks/${id}`,
    'PUT'
  );
}

export function useDeleteWebhook(id: string) {
  return useOpenSignMutation<void, void>(`webhooks/${id}`, 'DELETE');
}

export function useTestWebhook(id: string) {
  return useOpenSignMutation<{ success: boolean }, void>(
    `webhooks/${id}/test`,
    'POST'
  );
} 