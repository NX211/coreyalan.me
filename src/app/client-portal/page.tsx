'use client';

import PageHeader from '@/components/layout/PageHeader';
import { faTicket, faFileInvoice, faClock, faHeadset, faLock, faFileSignature, faFileAlt, faChartLine, faCog, faQuestionCircle, faFileLines, faShield, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Icon from '@/components/ui-components/Icon';
import { SupportWidget as SupportWidgetScript } from '@/components/app-providers/SupportWidget';
import dynamic from 'next/dynamic';

const SupportWidget = dynamic(() => import('@/components/features/SupportWidget'), {
  ssr: false
});

export default function ClientPortal() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Client Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Welcome to your secure client portal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="/client-portal/documents"
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Icon icon={faFileAlt} className="w-8 h-8 text-blue-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Documents
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload and manage your documents
                </p>
              </div>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <a
                href="https://helpdesk.authoritah.com/help/3530376337"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Access Support Portal
              </a>
            </div>
          </div>

          <a
            href="/client-portal/projects"
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Icon icon={faChartLine} className="w-8 h-8 text-green-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Projects
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Track project progress and updates
                </p>
              </div>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <a
                href="https://billing.coreyalan.me/client/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Access Billing Portal
              </a>
            </div>
          </div>

          {/* Document Signing Section */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6 relative" style={{ height: '500px' }}>
            <div style={{ paddingBottom: '60px' }}>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faFileSignature} className="text-primary h-6 w-6 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Document Center</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload and share project files securely through our document system. Sign important documents online including NDAs, contracts, and more.
              </p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Document Sharing:</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Securely upload files for collaboration and feedback. Our system also provides electronic document signing capabilities with legal validity.
                </p>
              </div>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <Link
                href="/client-portal/documents"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Access Documents
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center text-blue-600 dark:text-blue-400">
            <Icon icon={faQuestionCircle} className="w-5 h-5 mr-2" />
            <span>Need help? Contact support</span>
          </div>
        </div>
      </div>
      <SupportWidgetScript />
    </div>
  );
} 