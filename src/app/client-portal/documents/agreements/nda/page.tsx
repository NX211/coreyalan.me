'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileSignature, 
  faAngleRight, 
  faArrowLeft,
  faInfoCircle,
  faFileAlt,
  faDownload,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import DocumentSigning from '@/components/DocumentSigning';
import PageHeader from '@/components/PageHeader';

export default function NdaDocumentPage() {
  const [isSigned, setIsSigned] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSigningComplete = () => {
    setIsSigned(true);
  };

  const handleSigningError = (error: Error) => {
    console.error('Document signing error:', error);
    setHasError(true);
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="Non-Disclosure Agreement" 
        description="Review and sign your NDA document"
      />
      
      <div className="container mx-auto px-4 py-12 dark:bg-[#0F172A]">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <Link href="/client-portal" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
            Client Portal
          </Link>
          <FontAwesomeIcon icon={faAngleRight} className="mx-2 h-3 w-3 text-gray-400" />
          <Link href="/client-portal/documents" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
            Documents
          </Link>
          <FontAwesomeIcon icon={faAngleRight} className="mx-2 h-3 w-3 text-gray-400" />
          <Link href="/client-portal/documents/agreements" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
            Agreements
          </Link>
          <FontAwesomeIcon icon={faAngleRight} className="mx-2 h-3 w-3 text-gray-400" />
          <span className="text-primary">NDA</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Document Signing Section */}
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <FontAwesomeIcon 
                  icon={faFileSignature} 
                  className="text-white h-10 w-10 mb-4"
                />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Non-Disclosure Agreement
                </h2>
                <p className="text-blue-100">
                  Please review and sign the NDA below
                </p>
              </div>
              <div className="p-6">
                {isSigned ? (
                  <div className="text-center py-8">
                    <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
                      <FontAwesomeIcon 
                        icon={faFileSignature} 
                        className="text-green-500 h-12 w-12 mb-4"
                      />
                      <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                        Document Signed Successfully
                      </h3>
                      <p className="text-green-600 dark:text-green-400">
                        Thank you for signing the Non-Disclosure Agreement. A copy has been sent to your email for your records.
                      </p>
                    </div>
                    <Link 
                      href="/client-portal/documents" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
                      Return to Document Center
                    </Link>
                  </div>
                ) : hasError ? (
                  <div className="text-center py-8">
                    <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-800 mb-6">
                      <FontAwesomeIcon 
                        icon={faExclamationCircle} 
                        className="text-red-500 h-12 w-12 mb-4"
                      />
                      <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
                        Unable to Load Document
                      </h3>
                      <p className="text-red-600 dark:text-red-400 mb-4">
                        We're experiencing technical difficulties loading the document signing interface. Please try again later or contact support.
                      </p>
                      <div className="mt-4 space-y-4">
                        <a 
                          href="https://app.opensignlabs.com/d/nda-template/download"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors mr-4"
                        >
                          <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4" />
                          Download Document
                        </a>
                        <a
                          href="https://help.coreyalan.me/help/3530376337"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Contact Support
                        </a>
                      </div>
                    </div>
                    <Link 
                      href="/client-portal/documents/agreements" 
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
                      Back to Agreements
                    </Link>
                  </div>
                ) : (
                  <div className="document-signing-container">
                    <div className="document-description mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-blue-800 dark:text-blue-200">
                        This Non-Disclosure Agreement (NDA) is to protect confidential information shared during our business relationship. Please review and sign below.
                      </p>
                    </div>
                    
                    <DocumentSigning
                      documentUrl="https://app.opensignlabs.com/d/nda-template"
                      title="Non-Disclosure Agreement"
                      description="This Non-Disclosure Agreement (NDA) is to protect confidential information shared during our business relationship. Please review and sign below."
                      onComplete={handleSigningComplete}
                      onError={handleSigningError}
                    />
                  </div>
                )}

                {!isSigned && !hasError && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Link 
                      href="/client-portal/documents" 
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 mr-2" />
                      Back to Documents
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Document Info Card */}
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-0">
                  Document Information
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <FontAwesomeIcon icon={faFileAlt} className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Document Type
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Non-Disclosure Agreement
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <FontAwesomeIcon icon={faDownload} className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        PDF Download
                      </p>
                      <a 
                        href="https://app.opensignlabs.com/d/nda-template/download" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        Download a copy
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 h-5 w-5 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">About This Document</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                    This NDA is a standard agreement to protect confidential information shared between you and Corey Alan during your project. If you have any questions about this document, please contact us.
                  </p>
                  <a
                    href="https://help.coreyalan.me/help/3530376337"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 