'use client';

import { useState } from 'react';
import { faUpload, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '@/components/ui-components/Icon';
import DocumentUpload from '@/components/features/DocumentUpload';
import { ErrorResponse } from '@/types';

export default function UploadSection() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadSuccess = () => {
    setUploadSuccess(true);
    setUploadError(null);
  };

  const handleUploadError = (error: ErrorResponse) => {
    setUploadError(error.message);
    setUploadSuccess(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
      <div className="flex items-center mb-6">
        <div className="h-12 w-12 flex items-center justify-center bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg mr-4">
          <Icon icon={faUpload} className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Your Documents</h2>
      </div>

      <DocumentUpload
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
      />

      {/* Upload Status */}
      {uploadSuccess && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center">
            <Icon icon={faCheckCircle} className="text-green-500 h-5 w-5 mr-3" />
            <p className="text-green-800 dark:text-green-200">Document uploaded successfully!</p>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <Icon icon={faTimesCircle} className="text-red-500 h-5 w-5 mr-3" />
            <p className="text-red-800 dark:text-red-200">{uploadError}</p>
          </div>
        </div>
      )}
    </div>
  );
} 