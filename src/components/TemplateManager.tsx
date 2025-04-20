'use client';

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  useTemplates,
  useCreateTemplate,
  useUpdateTemplate,
  useDeleteTemplate,
} from '@/hooks/useOpenSign';
import { OpenSignTemplate } from '@/types/opensign';

export function TemplateManager() {
  const {
    data: templates,
    isLoading: isLoadingTemplates,
    error: templatesError,
    mutate: refreshTemplates,
  } = useTemplates();

  const {
    mutate: createTemplate,
    isLoading: isCreating,
    error: createError,
  } = useCreateTemplate();

  const {
    mutate: updateTemplate,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateTemplate('template-id');

  const {
    mutate: deleteTemplate,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteTemplate('template-id');

  // Handle errors
  useEffect(() => {
    if (templatesError) {
      toast.error(templatesError.message);
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
  }, [templatesError, createError, updateError, deleteError]);

  // Example: Create a new template
  const handleCreateTemplate = async () => {
    try {
      await createTemplate({
        name: 'New Template',
        description: 'A new template',
        content: 'Template content here',
      });
      toast.success('Template created successfully');
      refreshTemplates();
    } catch (error) {
      toast.error('Failed to create template');
    }
  };

  // Example: Update a template
  const handleUpdateTemplate = async (template: OpenSignTemplate) => {
    try {
      await updateTemplate({
        name: 'Updated Template Name',
        description: 'Updated description',
      });
      toast.success('Template updated successfully');
      refreshTemplates();
    } catch (error) {
      toast.error('Failed to update template');
    }
  };

  // Example: Delete a template
  const handleDeleteTemplate = async (templateId: string) => {
    try {
      await deleteTemplate();
      toast.success('Template deleted successfully');
      refreshTemplates();
    } catch (error) {
      toast.error('Failed to delete template');
    }
  };

  if (isLoadingTemplates) {
    return <div>Loading templates...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Template Manager</h2>
      
      <button
        onClick={handleCreateTemplate}
        disabled={isCreating}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isCreating ? 'Creating...' : 'Create Template'}
      </button>

      <div className="grid gap-4">
        {templates?.map((template) => (
          <div
            key={template.id}
            className="p-4 border rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <p className="text-gray-600">{template.description}</p>
            
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleUpdateTemplate(template)}
                disabled={isUpdating}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
              
              <button
                onClick={() => handleDeleteTemplate(template.id)}
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