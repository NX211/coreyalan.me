import React, { useState } from 'react';
import { useConversations, useConversation, useCreateConversation, useUpdateConversation, useDeleteConversation } from '@/lib/freescout/hooks';
import { ConversationStatus, ConversationType } from '@/lib/freescout/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const ConversationManager: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    status: undefined as ConversationStatus | undefined,
    type: undefined as ConversationType | undefined,
    search: '',
  });

  const { data: conversations, isLoading } = useConversations(filters);
  const { data: conversation } = useConversation(selectedConversation || 0);
  const createConversation = useCreateConversation();
  const updateConversation = useUpdateConversation();
  const deleteConversation = useDeleteConversation();

  const [formData, setFormData] = useState({
    type: 'email',
    subject: '',
    body: '',
    customerEmail: '',
    mailboxId: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await createConversation.mutateAsync({
        subject: formData.get('subject') as string,
        body: formData.get('body') as string,
        customerEmail: formData.get('customerEmail') as string,
        mailboxId: Number(formData.get('mailboxId')),
        type: formData.get('type') as ConversationType,
      });
      toast.success('Conversation created successfully');
    } catch (error) {
      toast.error('Failed to create conversation');
    }
  };

  const handleUpdate = async (id: number, data: Partial<any>) => {
    try {
      await updateConversation.mutateAsync({ id, data });
      toast.success('Conversation updated successfully');
    } catch (error) {
      toast.error('Failed to update conversation');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteConversation.mutateAsync(id);
      toast.success('Conversation deleted successfully');
    } catch (error) {
      toast.error('Failed to delete conversation');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filters */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="space-y-4">
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => 
                setFilters({ ...filters, status: value as ConversationStatus })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.type || 'all'}
              onValueChange={(value) => 
                setFilters({ ...filters, type: value as ConversationType })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="note">Note</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Search conversations..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </Card>

        {/* Conversation List */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Conversations</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-2">
              {conversations?.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedConversation === conv.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{conv.subject}</span>
                    <Badge variant={
                      conv.status === 'active' ? 'success' :
                      conv.status === 'pending' ? 'warning' :
                      conv.status === 'closed' ? 'default' :
                      'error'
                    }>{conv.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">{conv.preview}</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Conversation Details */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Conversation Details</h2>
          {selectedConversation ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Subject</h3>
                <p>{conversation?.subject}</p>
              </div>
              <div>
                <h3 className="font-medium">Status</h3>
                <Select
                  value={conversation?.status || 'active'}
                  onValueChange={(value) => 
                    handleUpdate(selectedConversation, { status: value })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="font-medium">Type</h3>
                <p>{conversation?.type}</p>
              </div>
              <div>
                <h3 className="font-medium">Customer</h3>
                <p>{conversation?.customerEmail}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedConversation)}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleUpdate(selectedConversation, { status: 'closed' })}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div>Select a conversation to view details</div>
          )}
        </Card>
      </div>

      {/* Create Conversation Form */}
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-bold mb-4">Create New Conversation</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <Input name="subject" required value={formData.subject} onChange={(e) => handleInputChange('subject', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Body</label>
            <Textarea name="body" required value={formData.body} onChange={(e) => handleInputChange('body', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Customer Email</label>
            <Input name="customerEmail" type="email" required value={formData.customerEmail} onChange={(e) => handleInputChange('customerEmail', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mailbox ID</label>
            <Input name="mailboxId" type="number" required value={formData.mailboxId} onChange={(e) => handleInputChange('mailboxId', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange('type', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="note">Note</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Create Conversation</Button>
        </form>
      </Card>
    </div>
  );
}; 