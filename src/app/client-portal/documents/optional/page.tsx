'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faInfoCircle, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import DocumentSigning from '@/components/features/DocumentSigning';

export default function OptionalDocumentsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Available Documents
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Review and sign any of the following documents
          </p>
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 h-6 w-6 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                About These Documents
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                These documents are available for your review and signature. While signing is optional, some documents like the NDA may be required for certain types of collaboration.
              </p>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="space-y-8">
          {/* NDA */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faFileSignature} className="text-primary h-8 w-8 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Non-Disclosure Agreement</h2>
            </div>
            
            <DocumentSigning
              documentId="o2Ej2CDZWdZgd9"
              onSignComplete={() => console.log('NDA signed')}
            />
          </div>

          {/* Project Collaboration Agreement */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faFileLines} className="text-primary h-8 w-8 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Collaboration Agreement</h2>
            </div>
            
            <DocumentSigning
              documentId="optional-agreement"
              onSignComplete={() => console.log('Project Collaboration Agreement signed')}
            />
          </div>

          {/* Client Feedback Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faFileLines} className="text-primary h-8 w-8 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Feedback Form</h2>
            </div>
            
            <DocumentSigning
              documentId="feedback-form"
              onSignComplete={() => console.log('Feedback Form signed')}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 