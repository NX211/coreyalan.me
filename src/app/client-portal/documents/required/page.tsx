'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import DocumentSigning from '@/components/DocumentSigning';

export default function RequiredDocumentsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Required Documents
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Please review and sign the following required documents
          </p>
        </div>

        {/* Document List */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faFileSignature} className="text-primary h-8 w-8 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Non-Disclosure Agreement</h2>
            </div>
            
            <DocumentSigning
              documentUrl="https://docuseal.com/d/o2Ej2CDZWdZgd9"
              title="Non-Disclosure Agreement"
              description="Please review and sign the NDA document below. This document is legally binding and protects confidential information."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 