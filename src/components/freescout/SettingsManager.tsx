import React, { useState } from 'react';
import { useFreeScoutAuth } from '@/lib/freescout/hooks';
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

type AuthMethod = 'header' | 'query' | 'basic';

const AUTH_METHODS: { value: AuthMethod; label: string }[] = [
  { value: 'header', label: 'Header Authentication' },
  { value: 'query', label: 'Query Parameter Authentication' },
  { value: 'basic', label: 'Basic Authentication' },
];

export const SettingsManager: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: authConfig, isLoading } = useFreeScoutAuth();

  const [formData, setFormData] = useState({
    baseUrl: authConfig?.baseUrl || '',
    apiKey: authConfig?.apiKey || '',
    authMethod: authConfig?.authMethod || 'header',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, authMethod: value as AuthMethod }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement updateAuthConfig mutation
      toast.success('Settings updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">FreeScout API Settings</h2>
          <Button
            variant={isEditing ? "secondary" : "default"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Settings'}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                name="baseUrl"
                value={formData.baseUrl}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://help.coreyalan.me/api"
              />
            </div>

            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                name="apiKey"
                type="password"
                value={formData.apiKey}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your API key"
              />
            </div>

            <div>
              <Label>Authentication Method</Label>
              <Select
                value={formData.authMethod}
                onValueChange={handleAuthMethodChange}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select authentication method" />
                </SelectTrigger>
                <SelectContent>
                  {AUTH_METHODS.map(method => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Current Configuration</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Base URL:</span> {authConfig?.baseUrl}</p>
            <p><span className="font-medium">Authentication Method:</span> {authConfig?.authMethod}</p>
            <p><span className="font-medium">Status:</span> {authConfig?.baseUrl ? 'Configured' : 'Not Configured'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}; 