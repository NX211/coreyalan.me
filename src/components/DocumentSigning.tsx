import React from 'react';
import { DocusealForm } from '@docuseal/react';

interface DocumentSigningProps {
  documentUrl: string;
  title?: string;
  description?: string;
}

const DocumentSigning: React.FC<DocumentSigningProps> = ({
  documentUrl,
  title = 'Sign Document',
  description = 'Please review and sign the document below.',
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="border rounded-lg p-4">
        <DocusealForm
          src={documentUrl}
        />
      </div>
    </div>
  );
};

export default DocumentSigning; 