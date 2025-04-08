'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpload,
  faFileLines,
  faShield,
  faInfoCircle,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export default function DocumentsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Document Portal
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upload and manage your documents securely
          </p>
        </div>

        {/* Navigation Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <Link
            href="/client-portal/documents/upload"
            className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 flex items-center justify-center bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                  <FontAwesomeIcon icon={faUpload} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Upload Documents</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Upload new documents securely</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="text-gray-400 group-hover:text-primary transition-colors duration-200" />
            </div>
          </Link>

          <Link
            href="/client-portal/documents/optional"
            className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                  <FontAwesomeIcon icon={faFileLines} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Available Documents</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">View and sign available documents</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="text-gray-400 group-hover:text-primary transition-colors duration-200" />
            </div>
          </Link>
        </div>

        {/* Featured Upload Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full mb-6">
              <FontAwesomeIcon icon={faUpload} className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Upload Documents
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Securely upload and share your documents with us. We support PDF and Word document formats.
            </p>
            <Link
              href="/client-portal/documents/upload"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
            >
              <FontAwesomeIcon icon={faUpload} className="h-5 w-5" />
              Start Upload
            </Link>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg mr-4">
              <FontAwesomeIcon icon={faShield} className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Secure Document Processing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Encryption</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All documents are encrypted during upload and storage using industry-standard protocols.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Storage</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Documents are stored in secure, compliant data centers with regular security audits.
              </p>
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start">
            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 h-6 w-6 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Document Guidelines
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                We accept PDF and Word documents up to 10MB in size. All uploads are encrypted and stored securely.
                Contact support if you need assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 