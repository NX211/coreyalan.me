import { Invoice } from '@/lib/services/invoiceService';
import { formatCurrency } from '@/lib/utils/format';

interface InvoiceListProps {
  invoices: Invoice[];
  isLoading: boolean;
  error: Error | null;
}

export function InvoiceList({ invoices, isLoading, error }: InvoiceListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'SENT':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading invoices. Please try again later.
      </div>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No invoices found
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {invoices.map((invoice) => (
        <li key={invoice.id} className="flex justify-between items-center">
          <div>
            <span className="text-gray-700 dark:text-gray-300">Invoice #{invoice.invoiceNumber}</span>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatCurrency(invoice.amount)}
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(invoice.status)}`}>
            {invoice.status}
          </span>
        </li>
      ))}
    </ul>
  );
} 