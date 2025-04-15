'use client';

import Icon from '@/components/ui-components/Icon';
import { ErrorResponse } from '@/types';
import { 
  faCheckCircle, 
  faExclamationCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

interface UploadStatusProps {
  status: 'idle' | 'uploading' | 'success' | 'error';
  error?: ErrorResponse | null;
  onRetry?: () => void;
}

export default function UploadStatus({ status, error, onRetry }: UploadStatusProps) {
  if (status === 'idle') return null;

  return (
    <div className="rounded-md p-4" role="alert">
      {status === 'uploading' && (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon
              icon={faSpinner}
              className="h-5 w-5 animate-spin text-primary"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">
              Uploading document...
            </h3>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon
              icon={faCheckCircle}
              className="h-5 w-5 text-green-400"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">
              Document uploaded successfully!
            </h3>
          </div>
        </div>
      )}

      {status === 'error' && error && (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon
              icon={faExclamationCircle}
              className="h-5 w-5 text-red-400"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">
              {error.message}
            </h3>
            {onRetry && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 