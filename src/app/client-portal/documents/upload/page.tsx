'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpload,
  faFileLines,
  faShield,
  faInfoCircle,
  faCheckCircle,
  faTimesCircle,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';
import DocumentUpload from '@/components/DocumentUpload';
import Script from 'next/script';

export default function UploadPage() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleUploadSuccess = () => {
    setUploadSuccess(true);
    setUploadError(null);
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setUploadSuccess(false);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 flex items-center justify-center bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg mr-4">
                  <FontAwesomeIcon icon={faUpload} className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Your Documents</h2>
              </div>

              <DocumentUpload
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
              />

              {/* Upload Status */}
              {uploadSuccess && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-5 w-5 mr-3" />
                    <p className="text-green-800 dark:text-green-200">Document uploaded successfully!</p>
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 h-5 w-5 mr-3" />
                    <p className="text-red-800 dark:text-red-200">{uploadError}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accepted Formats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg mr-3">
                  <FontAwesomeIcon icon={faFileLines} className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Accepted Formats</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mr-2"></span>
                  PDF Documents (.pdf)
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mr-2"></span>
                  Word Documents (.docx)
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mr-2"></span>
                  Maximum file size: 10MB
                </li>
              </ul>
            </div>

            {/* Security Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 flex items-center justify-center bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg mr-3">
                  <FontAwesomeIcon icon={faShield} className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mr-2"></span>
                  End-to-end encryption
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mr-2"></span>
                  Secure storage
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mr-2"></span>
                  Regular security audits
                </li>
              </ul>
            </div>

            {/* Info Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Need Help?
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    If you're having trouble uploading, please ensure your file meets the requirements above.
                    Contact support if you need assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FreeScout Widget Container */}
        <div id="freescout-widget-container"></div>
      </div>

      {/* FreeScout Widget Script */}
      <Script id="freescout-widget">
        {`
          var FreeScoutW={s:{"color":"#485564","position":"br","locale":"en","id":3192618876}};
          (function(d,e,s){
            if(d.getElementById("freescout-w"))return;
            a=d.createElement(e);
            m=d.getElementsByTagName(e)[0];
            a.async=1;
            a.id="freescout-w";
            a.src=s;
            m.parentNode.insertBefore(a, m)
          })(document,"script","https://helpdesk.authoritah.com/modules/enduserportal/js/widget.js?v=2259");
        `}
      </Script>
    </div>
  );
} 