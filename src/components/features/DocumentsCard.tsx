import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useDocuments } from '@/lib/queries/useDocuments';
import { DocumentStatus } from '@/types/common';

const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'signed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'draft':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

export default function DocumentsCard() {
  const { data: documents, isLoading, error } = useDocuments();

  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
        <FontAwesomeIcon icon={faFileSignature} className="h-8 w-8 text-white mb-4" />
        <h2 className="text-xl font-bold text-white">Documents</h2>
        <p className="text-blue-100 mt-1">View and sign important documents</p>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 dark:text-red-400">
              Failed to load documents. Please try again later.
            </div>
          ) : documents && documents.length > 0 ? (
            <ul className="space-y-3">
              {documents.slice(0, 3).map((doc) => (
                <li key={doc.id} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{doc.title}</span>
                  <span className={`${getStatusColor(doc.status)} text-xs px-2 py-1 rounded`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No documents available</p>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <Link 
            href="/client-portal/documents"
            className="inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Documents
          </Link>
        </div>
      </div>
    </div>
  );
} 