'use client';

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  useWebhooks,
  useCreateWebhook,
  useUpdateWebhook,
  useDeleteWebhook,
  useTestWebhook,
} from '@/hooks/useOpenSign';
import { OpenSignWebhook, WebhookEvent } from '@/types/opensign';

const AVAILABLE_EVENTS: WebhookEvent[] = [
  'document.created',
  'document.signed',
  'document.deleted',
  'template.created',
  'template.updated',
  'template.deleted',
];

export function WebhookManager() {
  const {
    data: webhooks,
    isLoading: isLoadingWebhooks,
    error: webhooksError,
    mutate: refreshWebhooks,
  } = useWebhooks();

  const {
    mutate: createWebhook,
    isLoading: isCreating,
    error: createError,
  } = useCreateWebhook();

  const {
    mutate: updateWebhook,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateWebhook('webhook-id');

  const {
    mutate: deleteWebhook,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteWebhook('webhook-id');

  const {
    mutate: testWebhook,
    isLoading: isTesting,
    error: testError,
  } = useTestWebhook('webhook-id');

  // Handle errors
  useEffect(() => {
    if (webhooksError) {
      toast.error(webhooksError.message);
    }
    if (createError) {
      toast.error(createError.message);
    }
    if (updateError) {
      toast.error(updateError.message);
    }
    if (deleteError) {
      toast.error(deleteError.message);
    }
    if (testError) {
      toast.error(testError.message);
    }
  }, [webhooksError, createError, updateError, deleteError, testError]);

  // Example: Create a new webhook
  const handleCreateWebhook = async () => {
    try {
      await createWebhook({
        url: 'https://your-webhook-url.com',
        events: ['document.created', 'document.signed'],
        isActive: true,
      });
      toast.success('Webhook created successfully');
      refreshWebhooks();
    } catch (error) {
      toast.error('Failed to create webhook');
    }
  };

  // Example: Update a webhook
  const handleUpdateWebhook = async (webhook: OpenSignWebhook) => {
    try {
      await updateWebhook({
        isActive: !webhook.isActive,
      });
      toast.success('Webhook updated successfully');
      refreshWebhooks();
    } catch (error) {
      toast.error('Failed to update webhook');
    }
  };

  // Example: Delete a webhook
  const handleDeleteWebhook = async (webhookId: string) => {
    try {
      await deleteWebhook();
      toast.success('Webhook deleted successfully');
      refreshWebhooks();
    } catch (error) {
      toast.error('Failed to delete webhook');
    }
  };

  // Example: Test a webhook
  const handleTestWebhook = async (webhookId: string) => {
    try {
      await testWebhook();
      toast.success('Webhook test successful');
    } catch (error) {
      toast.error('Webhook test failed');
    }
  };

  if (isLoadingWebhooks) {
    return <div>Loading webhooks...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Webhook Manager</h2>
      
      <button
        onClick={handleCreateWebhook}
        disabled={isCreating}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isCreating ? 'Creating...' : 'Create Webhook'}
      </button>

      <div className="grid gap-4">
        {webhooks?.map((webhook) => (
          <div
            key={webhook.id}
            className="p-4 border rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold">{webhook.url}</h3>
            <div className="mt-2">
              <span className={`px-2 py-1 rounded ${
                webhook.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {webhook.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="mt-2">
              <h4 className="font-medium">Events:</h4>
              <ul className="list-disc list-inside">
                {webhook.events.map((event) => (
                  <li key={event} className="text-gray-600">{event}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleUpdateWebhook(webhook)}
                disabled={isUpdating}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Toggle Status'}
              </button>
              
              <button
                onClick={() => handleTestWebhook(webhook.id)}
                disabled={isTesting}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
              >
                {isTesting ? 'Testing...' : 'Test'}
              </button>
              
              <button
                onClick={() => handleDeleteWebhook(webhook.id)}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 