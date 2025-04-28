import React, { useState } from 'react';
import { useWebhooks, useWebhook, useCreateWebhook, useUpdateWebhook, useDeleteWebhook, useTestWebhook } from '@/lib/freescout/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';

type WebhookEvent = 
  | 'conversation.created'
  | 'conversation.updated'
  | 'conversation.deleted'
  | 'customer.created'
  | 'customer.updated'
  | 'customer.deleted';

const WEBHOOK_EVENTS: WebhookEvent[] = [
  'conversation.created',
  'conversation.updated',
  'conversation.deleted',
  'customer.created',
  'customer.updated',
  'customer.deleted',
];

export const WebhookManager: React.FC = () => {
  const [selectedWebhook, setSelectedWebhook] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<WebhookEvent[]>([]);

  const { data: webhooks, isLoading } = useWebhooks();
  const { data: webhook } = useWebhook(selectedWebhook || 0);
  const createWebhook = useCreateWebhook();
  const updateWebhook = useUpdateWebhook();
  const deleteWebhook = useDeleteWebhook();
  const testWebhook = useTestWebhook();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await createWebhook.mutateAsync({
        url: formData.get('url') as string,
        events: selectedEvents,
        isEnabled: true,
      });
      toast.success('Webhook created successfully');
    } catch (error) {
      toast.error('Failed to create webhook');
    }
  };

  const handleUpdate = async (id: number, data: Partial<any>) => {
    try {
      await updateWebhook.mutateAsync({ id, data });
      toast.success('Webhook updated successfully');
    } catch (error) {
      toast.error('Failed to update webhook');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWebhook.mutateAsync(id);
      toast.success('Webhook deleted successfully');
    } catch (error) {
      toast.error('Failed to delete webhook');
    }
  };

  const handleTest = async (id: number) => {
    try {
      await testWebhook.mutateAsync(id);
      toast.success('Webhook test successful');
    } catch (error) {
      toast.error('Webhook test failed');
    }
  };

  const handleEventChange = (value: string) => {
    const event = value as WebhookEvent;
    setSelectedEvents(prev => 
      prev.includes(event) 
        ? prev.filter(e => e !== event)
        : [...prev, event]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Search Webhooks</h2>
          <Input
            type="text"
            placeholder="Search webhooks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        {/* Webhook List */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Webhooks</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-2">
              {webhooks?.map((wh) => (
                <div
                  key={wh.id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedWebhook === wh.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedWebhook(wh.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{wh.url}</span>
                    <Badge variant={wh.isEnabled ? "success" : "warning"}>
                      {wh.isEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {wh.events.length} events
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Webhook Details */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Webhook Details</h2>
          {selectedWebhook ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">URL</h3>
                <p>{webhook?.url}</p>
              </div>
              <div>
                <h3 className="font-medium">Events</h3>
                <div className="flex flex-wrap gap-1">
                  {webhook?.events.map((event) => (
                    <Badge key={event} variant="warning">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium">Status</h3>
                <Badge variant={webhook?.isEnabled ? "success" : "warning"}>
                  {webhook?.isEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedWebhook)}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleUpdate(selectedWebhook, { isEnabled: !webhook?.isEnabled })}
                >
                  {webhook?.isEnabled ? 'Disable' : 'Enable'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleTest(selectedWebhook)}
                >
                  Test
                </Button>
              </div>
            </div>
          ) : (
            <div>Select a webhook to view details</div>
          )}
        </Card>
      </div>

      {/* Create Webhook Form */}
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-bold mb-4">Create New Webhook</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <Input name="url" type="url" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Events</label>
            <div className="space-y-2">
              {WEBHOOK_EVENTS.map((event) => (
                <div key={event} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={event}
                    checked={selectedEvents.includes(event)}
                    onChange={() => handleEventChange(event)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor={event} className="text-sm">
                    {event}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit">Create Webhook</Button>
        </form>
      </Card>
    </div>
  );
}; 