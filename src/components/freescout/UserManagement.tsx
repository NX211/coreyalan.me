import React, { useState } from 'react';
import { useUsers, useUser, useCreateUser, useUpdateUser, useDeleteUser, useUserRoles } from '@/lib/freescout/hooks';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';

interface FreeScoutRole {
  id: number;
  name: string;
  permissions: string[];
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: FreeScoutRole;
  isEnabled: boolean;
}

export const UserManagement: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: roles, isLoading: isLoadingRoles } = useUserRoles();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await createUser.mutateAsync({
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        role: roles?.find((r: FreeScoutRole) => r.id === Number(formData.get('role')))?.name || 'user',
        isEnabled: formData.get('isEnabled') === 'true',
      });
      toast.success('User created successfully');
      setIsCreating(false);
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleUpdate = async (id: number, data: Partial<User>) => {
    try {
      await updateUser.mutateAsync({
        id,
        data: {
          ...data,
          role: roles?.find((r: FreeScoutRole) => r.id === Number(data.role))?.name || 'user'
        }
      });
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser.mutateAsync(id);
      toast.success('User deleted successfully');
      setSelectedUser(null);
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const selectedUserData = users?.find((user: User) => user.id === selectedUser);

  if (isLoadingUsers || isLoadingRoles) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search and Create */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="default"
              onClick={() => setIsCreating(true)}
              className="w-full"
            >
              Create New User
            </Button>
          </div>
        </Card>

        {/* User List */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Available Users</h2>
          <div className="space-y-2">
            {users?.map((user: User) => (
              <div
                key={user.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedUser === user.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedUser(user.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{user.firstName} {user.lastName}</span>
                  <span className="text-sm text-gray-600">{user.email}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* User Details */}
        <Card className="p-4">
          {isCreating ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Create New User</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Select
                    value={selectedUserData?.role?.id?.toString() || ''}
                    onValueChange={(value) => setSelectedUser(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles?.map((role: FreeScoutRole) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create User</Button>
                </div>
              </form>
            </div>
          ) : selectedUser ? (
            <div>
              <h2 className="text-xl font-bold mb-4">User Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Name</h3>
                  <p>{selectedUserData?.firstName} {selectedUserData?.lastName}</p>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>{selectedUserData?.email}</p>
                </div>
                <div>
                  <h3 className="font-medium">Role</h3>
                  <p>{selectedUserData?.role?.name}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    onClick={() => handleDelete(selectedUser)}
                  >
                    Delete User
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      setIsCreating(true);
                      setSelectedUser(null);
                    }}
                  >
                    Create New
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Select a user to view details or create a new one
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}; 