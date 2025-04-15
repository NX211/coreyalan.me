'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileSignature, 
  faCloudUploadAlt, 
  faFile,
  faArrowRight,
  faDownload,
  faQuestionCircle,
  faFolderOpen,
  faSearch,
  faInfoCircle,
  faTicket,
  faEnvelope,
  faHeadset,
  faComments,
  faFileAlt,
  faBook,
  faLock,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@/components/PageHeader';

// Add FreeScoutW to Window interface
declare global {
  interface Window {
    FreeScoutW?: {
      show: () => void;
    };
  }
}

export default function DocumentsPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="Document Center" 
        description="Manage, sign, and share documents in one secure location"
      />
      
      <div className="container mx-auto px-4 py-12 dark:bg-[#0F172A]">
        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Document Upload Card */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <FontAwesomeIcon 
                icon={faCloudUploadAlt} 
                className="text-white h-12 w-12 mb-4"
              />
              <h2 className="text-2xl font-bold text-white mb-2">
                Upload & Share
              </h2>
              <p className="text-green-100">
                Securely upload and share project files
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-600 dark:text-gray-400 mb-auto">
                Upload documents, designs, spreadsheets, or any project files you&apos;d like to share. Files are securely stored in a shared Google Drive folder for easy collaboration.
              </p>
              <div className="mt-6">
                <Link 
                  href="/client-portal/documents/upload" 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon 
                      icon={faCloudUploadAlt} 
                      className="h-5 w-5 text-primary mr-3" 
                    />
                    <span className="font-medium text-gray-900 dark:text-white">Upload Documents</span>
                  </div>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" 
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Document Signing Card */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <FontAwesomeIcon 
                icon={faFileSignature} 
                className="text-white h-12 w-12 mb-4"
              />
              <h2 className="text-2xl font-bold text-white mb-2">
                Sign Documents
              </h2>
              <p className="text-blue-100">
                Review and sign legal documents and agreements
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-600 dark:text-gray-400 mb-auto">
                Sign important documents securely online. Currently, only the Non-Disclosure Agreement is available for signing.
              </p>
              <div className="mt-6">
                <Link 
                  href="/client-portal/documents/agreements" 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon 
                      icon={faFileSignature} 
                      className="h-5 w-5 text-primary mr-3" 
                    />
                    <span className="font-medium text-gray-900 dark:text-white">View Legal Agreements</span>
                  </div>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" 
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6 mb-12">
          <div className="flex items-center mb-6">
            <FontAwesomeIcon 
              icon={faQuestionCircle} 
              className="h-6 w-6 text-primary mr-3" 
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Document Upload FAQ */}
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="h-4 w-4 text-primary mr-2" />
                  What file formats can I upload?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We accept PDF, Word (DOC, DOCX), Excel (XLS, XLSX), images (JPG, PNG), and text files. Maximum file size is 50MB per file. Please do not upload sensitive personal information (SSN, financial details, etc.).
                </p>
              </div>
              
              {/* Security FAQ */}
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FontAwesomeIcon icon={faLock} className="h-4 w-4 text-primary mr-2" />
                  How secure are my documents?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Files are uploaded to a secure shared Google Drive folder. All documents are encrypted in transit and at rest. Access is restricted to you and the Corey Alan team members assigned to your project.
                </p>
              </div>
              
              {/* Document Signing FAQ */}
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FontAwesomeIcon icon={faFileSignature} className="h-4 w-4 text-primary mr-2" />
                  How does document signing work?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our electronic signature system is legally binding and compliant with e-signature laws. Visit the Legal Agreements section to sign documents like the Non-Disclosure Agreement. When you sign a document, you&apos;ll be guided through a step-by-step process, and once completed, all parties receive a fully executed copy.
                </p>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Document Access FAQ */}
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FontAwesomeIcon icon={faFolderOpen} className="h-4 w-4 text-primary mr-2" />
                  Who can access my uploaded documents?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Files will be uploaded to a secure shared Google Drive folder. Only you and the Corey Alan team members assigned to your project can access your documents. We never share your files with third parties without your explicit permission.
                </p>
              </div>
              
              {/* File Management FAQ */}
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FontAwesomeIcon icon={faFile} className="h-4 w-4 text-primary mr-2" />
                  Can I delete or replace documents after uploading?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Yes, you can manage your uploaded documents at any time. To delete or replace a file, navigate to the document management section where you can remove existing files or upload new versions.
                </p>
              </div>
              
              {/* Document Issues FAQ */}
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4 text-primary mr-2" />
                  What if I have problems uploading or signing documents?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  If you encounter any issues, please contact our support team using one of the methods below. Common solutions include clearing your browser cache, using a different browser, or checking your internet connection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg shadow-md mb-6">
          <div className="p-6">
            <div className="flex items-start">
              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 h-6 w-6 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">Need Help?</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  If you have questions about documents, uploading files, or signing agreements, our support team is here to help you. Choose your preferred support option below.
                </p>
              </div>
            </div>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 pt-0">
            {/* Support Portal */}
            <div className="bg-white dark:bg-[#1E293B] p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                  <FontAwesomeIcon 
                    icon={faTicket} 
                    className="h-6 w-6 text-blue-600 dark:text-blue-400" 
                  />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Support Tickets</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Submit a ticket through our help desk for technical assistance
                </p>
                <a
                  href="https://help.coreyalan.me/help/3530376337"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  <FontAwesomeIcon icon={faTicket} className="mr-2 h-4 w-4" />
                  Open Support Portal
                </a>
              </div>
            </div>

            {/* Email Support */}
            <div className="bg-white dark:bg-[#1E293B] p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                  <FontAwesomeIcon 
                    icon={faEnvelope} 
                    className="h-6 w-6 text-green-600 dark:text-green-400" 
                  />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Send us an email directly for non-urgent document questions
                </p>
                <a
                  href="mailto:support@coreyalan.me"
                  className="inline-flex items-center justify-center w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 h-4 w-4" />
                  Email Support
                </a>
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-white dark:bg-[#1E293B] p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                  <FontAwesomeIcon 
                    icon={faComments} 
                    className="h-6 w-6 text-purple-600 dark:text-purple-400" 
                  />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Us</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Get in touch with our team for personalized assistance
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  <FontAwesomeIcon icon={faComments} className="mr-2 h-4 w-4" />
                  Go to Contact Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 