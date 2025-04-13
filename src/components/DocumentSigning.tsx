import React from 'react';
import OpenSignForm from './OpenSignForm';

interface DocumentSigningProps {
  documentUrl: string;
  title?: string;
  description?: string;
  email?: string;
  name?: string;
  role?: string;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

const DocumentSigning: React.FC<DocumentSigningProps> = ({
  documentUrl,
  title = 'Sign Document',
  description = 'Please review and sign the document below.',
  email = '',
  name = '',
  role = '',
  onComplete,
  onError,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      
      <div className="border rounded-lg p-4 dark:border-gray-700">
        <OpenSignForm
          src={documentUrl}
          email={email}
          name={name}
          role={role}
          onComplete={onComplete}
          onError={onError}
        />
      </div>
    </div>
  );
};

export default DocumentSigning; 