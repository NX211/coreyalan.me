import { 
  faFileLines,
  faShield,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import Icon from '@/components/ui-components/Icon';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const UploadSection = dynamic(() => import('@/components/features/UploadSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64" />,
  ssr: false
});

const SupportWidget = dynamic(() => import('@/components/features/SupportWidget'), {
  ssr: false
});

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Upload Documents
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2-xl mx-auto">
            Securely upload your documents for review and processing
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <UploadSection />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accepted Formats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Accepted Formats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="relative w-8 h-8 mr-3">
                    <Image
                      src="/icons/pdf.svg"
                      alt="PDF Icon"
                      fill
                      className="object-contain"
                      sizes="32px"
                    />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">PDF Documents</span>
                </div>
                <div className="flex items-center">
                  <div className="relative w-8 h-8 mr-3">
                    <Image
                      src="/icons/doc.svg"
                      alt="Word Icon"
                      fill
                      className="object-contain"
                      sizes="32px"
                    />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">Word Documents</span>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Security Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Icon icon={faShield} className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <p className="text-gray-600 dark:text-gray-300">
                    All documents are encrypted and stored securely.
                  </p>
                </div>
                <div className="flex items-start">
                  <Icon icon={faInfoCircle} className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Maximum file size: 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Info Notice */}
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
              <div className="flex items-start">
                <Icon icon={faInfoCircle} className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                <p className="text-blue-700 dark:text-blue-300">
                  Need help? Our support team is available 24/7 to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FreeScout Widget Container */}
        <div id="freescout-widget-container"></div>
      </div>

      <SupportWidget />
    </div>
  );
} 