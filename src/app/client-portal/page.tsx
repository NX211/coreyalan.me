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
          </a>

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
          </a>

          <a
            href="/client-portal/settings"
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Icon icon={faCog} className="w-8 h-8 text-purple-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Settings
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your account settings
                </p>
              </div>
            </div>
          </a>
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