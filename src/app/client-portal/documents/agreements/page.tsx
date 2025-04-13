'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileSignature, 
  faAngleRight,
  faArrowRight, 
  faArrowLeft,
  faFileContract,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@/components/PageHeader';

export default function AgreementsPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="Legal Agreements" 
        description="Review and sign important documents"
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
          <span className="text-primary">Agreements</span>
        </div>

        {/* Back to Documents */}
        <div className="mb-8">
          <Link 
            href="/client-portal/documents" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 mr-2" />
            Back to Document Center
          </Link>
        </div>

        {/* Available Agreements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* NDA Card */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <FontAwesomeIcon 
                icon={faFileSignature} 
                className="text-white h-10 w-10 mb-4"
              />
              <h2 className="text-xl font-bold text-white mb-2">
                Non-Disclosure Agreement
              </h2>
              <p className="text-blue-100 text-sm">
                Protects confidential information
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-600 dark:text-gray-400 mb-auto">
                This agreement ensures that all confidential information shared during our business relationship remains protected.
              </p>
              <div className="mt-6">
                <Link 
                  href="/client-portal/documents/agreements/nda" 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon 
                      icon={faFileSignature} 
                      className="h-5 w-5 text-primary mr-3" 
                    />
                    <span className="font-medium text-gray-900 dark:text-white">Sign NDA</span>
                  </div>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" 
                  />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Service Agreement Card - Coming Soon */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden flex flex-col opacity-70">
            <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-6">
              <FontAwesomeIcon 
                icon={faFileContract} 
                className="text-white h-10 w-10 mb-4"
              />
              <h2 className="text-xl font-bold text-white mb-2">
                Service Agreement
              </h2>
              <p className="text-gray-100 text-sm">
                Coming soon
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-600 dark:text-gray-400 mb-auto">
                This agreement outlines the services to be provided, deliverables, timeline, and payment terms for our project.
              </p>
              <div className="mt-6">
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon 
                      icon={faFileContract} 
                      className="h-5 w-5 text-gray-400 mr-3" 
                    />
                    <span className="font-medium text-gray-400 dark:text-gray-500">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Statement of Work - Coming Soon */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden flex flex-col opacity-70">
            <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-6">
              <FontAwesomeIcon 
                icon={faFileAlt} 
                className="text-white h-10 w-10 mb-4"
              />
              <h2 className="text-xl font-bold text-white mb-2">
                Statement of Work
              </h2>
              <p className="text-gray-100 text-sm">
                Coming soon
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-600 dark:text-gray-400 mb-auto">
                Detailed description of the project work, specific tasks, deliverables, and technical requirements.
              </p>
              <div className="mt-6">
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon 
                      icon={faFileAlt} 
                      className="h-5 w-5 text-gray-400 mr-3" 
                    />
                    <span className="font-medium text-gray-400 dark:text-gray-500">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 