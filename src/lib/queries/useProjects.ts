import { useQuery } from '@tanstack/react-query';
import { schemas } from '@/types/common';
import { z } from 'zod';
import { ApiError, NotFoundError } from '@/lib/api/errors';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          response.status,
          error.error?.message || 'Failed to fetch projects',
          error.error?.code || 'INTERNAL_ERROR',
          error.error?.details
        );
      }
      const data = await response.json();
      return z.union([schemas.projectInfo, schemas.projectFeature]).array().parse(data);
    },
  });
}; 