import React, { useState } from 'react';
import { useMailboxes, useMailbox, useCreateMailbox, useUpdateMailbox, useDeleteMailbox } from '@/lib/freescout/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const MailboxManager: React.FC = () => {
  const [selectedMailbox, setSelectedMailbox] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const { data: mailboxes, isLoading } = useMailboxes();
  const { data: mailbox } = useMailbox(selectedMailbox || 0);
  const createMailbox = useCreateMailbox();
  const updateMailbox = useUpdateMailbox();
  const deleteMailbox = useDeleteMailbox();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await createMailbox.mutateAsync({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        isEnabled: true,
      });
      toast.success('Mailbox created successfully');
    } catch (error) {
      toast.error('Failed to create mailbox');
    }
  };

  const handleUpdate = async (id: number, data: Partial<any>) => {
    try {
      await updateMailbox.mutateAsync({ id, data });
      toast.success('Mailbox updated successfully');
    } catch (error) {
      toast.error('Failed to update mailbox');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMailbox.mutateAsync(id);
      toast.success('Mailbox deleted successfully');
    } catch (error) {
      toast.error('Failed to delete mailbox');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Search Mailboxes</h2>
          <Input
            type="text"
            placeholder="Search mailboxes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        {/* Mailbox List */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Mailboxes</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-2">
              {mailboxes?.map((mb) => (
                <div
                  key={mb.id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedMailbox === mb.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedMailbox(mb.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{mb.name}</span>
                    <Badge variant={mb.isEnabled ? "success" : "error"}>
                      {mb.isEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">{mb.email}</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Mailbox Details */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Mailbox Details</h2>
          {selectedMailbox ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Name</h3>
                <p>{mailbox?.name}</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p>{mailbox?.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Status</h3>
                <Badge variant={mailbox?.isEnabled ? "success" : "error"}>
                  {mailbox?.isEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedMailbox)}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleUpdate(selectedMailbox, { isEnabled: !mailbox?.isEnabled })}
                >
                  {mailbox?.isEnabled ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </div>
          ) : (
            <div>Select a mailbox to view details</div>
          )}
        </Card>
      </div>

      {/* Create Mailbox Form */}
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-bold mb-4">Create New Mailbox</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input name="name" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input name="email" type="email" required />
          </div>
          <Button type="submit">Create Mailbox</Button>
        </form>
      </Card>
    </div>
  );
}; 