import { useSession } from '@/lib/hooks/useSession';
import { useQuery } from '@tanstack/react-query';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  dueDate: string;
  createdAt: string;
}

export function useInvoices() {
  const session = useSession();

  return useQuery<Invoice[]>({
    queryKey: ['invoices'],
    queryFn: async () => {
      const response = await fetch('/api/invoices');
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      return response.json();
    },
    enabled: !!session?.isAuthenticated,
  });
} 