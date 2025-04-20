'use client';

import PageHeader from '@/components/layout/PageHeader';
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faFileInvoice, faClock, faHeadset, faLock, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { RemoteSupportDownload } from '@/components/remote-support-download';

export default function ClientPortal() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="Client Portal" 
        description="Your central hub for support, billing, and project management"
      />
      
      <div className="container mx-auto px-4 py-12 dark:bg-[#0F172A]">
        {/* Quick Stats/Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faHeadset} className="text-primary h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">24/7 Support</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Get help anytime with our round-the-clock support system. Average response time: 2 hours.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faLock} className="text-primary h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Secure Access</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              All your data is protected with enterprise-grade security and encryption.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faClock} className="text-primary h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Access</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              One-click access to all your support tickets, invoices, and project documents.
            </p>
          </div>
        </div>

        {/* Main Portal Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support Section */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6 relative" style={{ height: '500px' }}>
            <div style={{ paddingBottom: '60px' }}>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faTicket} className="text-primary h-6 w-6 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Submit a support ticket or check the status of existing tickets using the widget below. Our support team is here to help with any technical issues, questions, or concerns.
              </p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Common Support Topics:</h3>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Technical Issues</li>
                  <li>Account Management</li>
                  <li>Billing Questions</li>
                  <li>Feature Requests</li>
                </ul>
              </div>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <a
                href="https://help.coreyalan.me/help/3530376337"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Access Support Portal
              </a>
            </div>
          </div>

          {/* Billing Section */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6 relative" style={{ height: '500px' }}>
            <div style={{ paddingBottom: '60px' }}>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faFileInvoice} className="text-primary h-6 w-6 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Billing Portal</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Access your billing information, invoices, and payment history. Manage your subscription, update payment methods, and download past invoices.
              </p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Available Actions:</h3>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                  <li>View and Download Invoices</li>
                  <li>Update Payment Methods</li>
                  <li>Manage Subscription</li>
                  <li>View Payment History</li>
                </ul>
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

        {/* Remote Support Download Section */}
        <div className="mt-12">
          <RemoteSupportDownload />
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How do I submit a support ticket?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Click the &quot;Access Support Portal&quot; button above and use the widget to create a new ticket. Provide as much detail as possible about your issue.
              </p>
            </div>
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Where can I find my invoices?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All invoices are available in the Billing Portal. Click the &quot;Access Billing Portal&quot; button to view and download your invoices.
              </p>
            </div>
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What&apos;s the response time for support?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We aim to respond to all support tickets within 2 hours during business hours. Emergency issues are prioritized.
              </p>
            </div>
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How do I sign documents?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Click the &quot;Access Documents&quot; button to view and sign your documents. You&apos;ll be guided through the signing process with clear instructions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Script id="freescout-widget">
        {
          `
          var FreeScoutW={s:{"color":"#485564","position":"br","locale":"en","id":3192618876}};
          (function(d,e,s){
            if(d.getElementById("freescout-w"))return;
            a=d.createElement(e);
            m=d.getElementsByTagName(e)[0];
            a.async=1;
            a.id="freescout-w";
            a.src=s;
            m.parentNode.insertBefore(a, m)
          })(document,"script","https://help.coreyalan.me/modules/enduserportal/js/widget.js?v=2259");
        `
        }
      </Script>
    </div>
  );
} 