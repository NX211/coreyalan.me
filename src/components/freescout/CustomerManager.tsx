import React, { useState } from 'react';
import { useCustomers, useCustomer, useCreateCustomer, useUpdateCustomer, useDeleteCustomer } from '@/lib/freescout/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const CustomerManager: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const { data: customers, isLoading } = useCustomers({ search });
  const { data: customer } = useCustomer(selectedCustomer || 0);
  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();
  const deleteCustomer = useDeleteCustomer();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await createCustomer.mutateAsync({
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
      });
      toast.success('Customer created successfully');
    } catch (error) {
      toast.error('Failed to create customer');
    }
  };

  const handleUpdate = async (id: number, data: Partial<any>) => {
    try {
      await updateCustomer.mutateAsync({ id, data });
      toast.success('Customer updated successfully');
    } catch (error) {
      toast.error('Failed to update customer');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCustomer.mutateAsync(id);
      toast.success('Customer deleted successfully');
    } catch (error) {
      toast.error('Failed to delete customer');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Search Customers</h2>
          <Input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        {/* Customer List */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Customers</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-2">
              {customers?.map((cust) => (
                <div
                  key={cust.id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedCustomer === cust.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCustomer(cust.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{cust.firstName} {cust.lastName}</span>
                    <Badge variant="default">{cust.email}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">{cust.phone}</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Customer Details */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Customer Details</h2>
          {selectedCustomer ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Name</h3>
                <p>{customer?.firstName} {customer?.lastName}</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p>{customer?.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p>{customer?.phone}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedCustomer)}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleUpdate(selectedCustomer, {})}
                >
                  Edit
                </Button>
              </div>
            </div>
          ) : (
            <div>Select a customer to view details</div>
          )}
        </Card>
      </div>

      {/* Create Customer Form */}
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-bold mb-4">Create New Customer</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input name="firstName" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input name="lastName" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input name="email" type="email" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input name="phone" type="tel" required />
          </div>
          <Button type="submit">Create Customer</Button>
        </form>
      </Card>
    </div>
  );
}; 