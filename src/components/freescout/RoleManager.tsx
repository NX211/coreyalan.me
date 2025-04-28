import React, { useState } from 'react';
import { useUserRoles, useCreateUserRole, useUpdateUserRole, useDeleteUserRole } from '@/lib/freescout/hooks';
import { FreeScoutRole, RoleInput, RoleUpdate } from '@/lib/freescout/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type Permission = 
  | 'conversations.view'
  | 'conversations.create'
  | 'conversations.update'
  | 'conversations.delete'
  | 'customers.view'
  | 'customers.create'
  | 'customers.update'
  | 'customers.delete'
  | 'mailboxes.view'
  | 'mailboxes.create'
  | 'mailboxes.update'
  | 'mailboxes.delete'
  | 'users.view'
  | 'users.create'
  | 'users.update'
  | 'users.delete'
  | 'settings.view'
  | 'settings.update';

const PERMISSIONS: Permission[] = [
  'conversations.view',
  'conversations.create',
  'conversations.update',
  'conversations.delete',
  'customers.view',
  'customers.create',
  'customers.update',
  'customers.delete',
  'mailboxes.view',
  'mailboxes.create',
  'mailboxes.update',
  'mailboxes.delete',
  'users.view',
  'users.create',
  'users.update',
  'users.delete',
  'settings.view',
  'settings.update',
];

export const RoleManager: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);

  const { data: roles, isLoading } = useUserRoles();
  const createRole = useCreateUserRole();
  const updateRole = useUpdateUserRole();
  const deleteRole = useDeleteUserRole();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const roleInput: RoleInput = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      permissions: selectedPermissions,
    };
    try {
      await createRole.mutateAsync(roleInput);
      toast.success('Role created successfully');
      setIsCreating(false);
      setSelectedPermissions([]);
    } catch (error) {
      toast.error('Failed to create role');
    }
  };

  const handleUpdate = async (id: number, data: RoleUpdate) => {
    try {
      await updateRole.mutateAsync({ 
        id, 
        data: {
          name: data.name || '',
          permissions: data.permissions || []
        }
      });
      toast.success('Role updated successfully');
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRole.mutateAsync(id);
      toast.success('Role deleted successfully');
      setSelectedRole(null);
    } catch (error) {
      toast.error('Failed to delete role');
    }
  };

  const handlePermissionToggle = (permission: Permission) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const selectedRoleData = roles?.find((role: FreeScoutRole) => role.id === selectedRole);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search and Create */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Roles</h2>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Search roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="default"
              onClick={() => setIsCreating(true)}
              className="w-full"
            >
              Create New Role
            </Button>
          </div>
        </Card>

        {/* Role List */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Available Roles</h2>
          {isLoading ? (
            <div>Loading roles...</div>
          ) : (
            <div className="space-y-2">
              {roles?.map((role: FreeScoutRole) => (
                <div
                  key={role.id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedRole === role.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{role.name}</span>
                    <Badge variant="default">
                      {role.permissions.length} permissions
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {role.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Role Details */}
        <Card className="p-4">
          {isCreating ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Create New Role</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter role name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    required
                    placeholder="Enter role description"
                  />
                </div>
                <div>
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    {PERMISSIONS.map((permission: Permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={permission}
                          checked={selectedPermissions.includes(permission)}
                          onChange={() => handlePermissionToggle(permission)}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={permission} className="text-sm">
                          {permission}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Role</Button>
                </div>
              </form>
            </div>
          ) : selectedRole ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Role Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Name</h3>
                  <p>{selectedRoleData?.name}</p>
                </div>
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p>{selectedRoleData?.description}</p>
                </div>
                <div>
                  <h3 className="font-medium">Permissions</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedRoleData?.permissions.map((permission: string) => (
                      <Badge key={permission} variant="default">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedRole)}
                  >
                    Delete Role
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      setIsCreating(true);
                      setSelectedRole(null);
                    }}
                  >
                    Create New
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Select a role to view details or create a new one
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}; 