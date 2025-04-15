import { useQuery } from '@tanstack/react-query';
import { schemas } from '@/types/common';

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await fetch('/api/documents');
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      return schemas.document.array().parse(data);
    },
  });
}; 