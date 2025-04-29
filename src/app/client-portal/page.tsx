'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faFileInvoice, faClock, faHeadset, faLock, faFileSignature, faSignInAlt, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { RemoteSupportDownload } from '@/components/remote-support-download';
import { useSession } from '@/lib/hooks/useSession';
import { ClientPortalCard } from '@/components/client-portal/card';
import { LoginCard } from '@/components/auth/login-card';
import { FaqCard } from '@/components/faq/FaqCard';

export default function ClientPortal() {
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session?.isAuthenticated ?? false;
  
  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated) {
      router.push('/client-portal/dashboard');
    }
  }, [isAuthenticated, router]);
  
  // If authenticated, show loading state while redirecting
  if (isAuthenticated) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="Client Portal" 
        description="Your Central Hub For Support, Billing, And Project Management"
      />
      
      <div className="container mx-auto px-4 py-12 dark:bg-[#0F172A]">
        {/* Quick Stats/Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center text-center mb-4">
              <FontAwesomeIcon icon={faHeadset} className="text-primary h-6 w-6 mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">24/7 Support</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Get help anytime with our round-the-clock support system. Average response time: 2 hours.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center text-center mb-4">
              <FontAwesomeIcon icon={faLock} className="text-primary h-6 w-6 mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Secure Access</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              All your data is protected with enterprise-grade security and encryption.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center text-center mb-4">
              <FontAwesomeIcon icon={faClock} className="text-primary h-6 w-6 mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Access</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              One-click access to all your support tickets, invoices, and project documents.
            </p>
          </div>
        </div>

        {/* Main Portal Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support Section */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6 relative" style={{ height: '500px' }}>
            <div style={{ paddingBottom: '60px' }}>
              <div className="flex flex-col items-center text-center mb-4">
                <FontAwesomeIcon icon={faTicket} className="text-primary h-6 w-6 mb-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                Submit a support ticket or check the status of existing tickets using the button below. Our support team is here to help with any technical issues, questions, or concerns.
              </p>
              <div className="mb-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Common Support Topics:</h3>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1 inline-block text-left">
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

          {/* Login Section */}
          <LoginCard />

          {/* Document Signing Section */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6 relative" style={{ height: '500px' }}>
            <div style={{ paddingBottom: '60px' }}>
              <div className="flex flex-col items-center text-center mb-4">
                <FontAwesomeIcon icon={faFileSignature} className="text-primary h-6 w-6 mb-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Document Center</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                Upload and share project files securely through our document system. Sign important documents online including NDAs, contracts, and more.
              </p>
              <div className="mb-4 text-center">
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
          <h2 className="text-2xl font-bold text-[#37abc8] mb-6 text-center">Remote Support Client</h2>
          <RemoteSupportDownload />
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-[#37abc8] mb-6 sm:mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="masonry-grid grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 container mx-auto px-4 sm:px-6">
            <div className="break-inside-avoid">
              <FaqCard question="How do I submit a support ticket?">
                Click the &quot;Access Support Portal&quot; button above and use the widget to create a new ticket. Provide as much detail as possible about your issue.
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="How do I access my account?">
                Click the &quot;Sign In to Your Account&quot; button above and enter your email and password. If you don&apos;t have an account, contact support to get set up.
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="What's the response time for support?">
                We aim to respond to all support tickets within 2 hours during business hours. Emergency issues are prioritized.
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="How do I sign documents?">
                Click the &quot;Access Documents&quot; button to view and sign your documents. You&apos;ll be guided through the signing process with clear instructions.
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="How do I install the support client software on Windows?">
                Download the Windows installer from the Remote Support section above. Run the installer and follow the prompts. For silent installation, run the installer with <code>--silent-install</code> parameter.
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="How do I install the support client software on Mac?">
                Download the Mac DMG file from the Remote Support section. Open the DMG file and drag the support client to Applications. Allow it to run and enable requested permissions to complete setup.
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="How do I install the support client software on Ubuntu?">
                Download the DEB package from the Remote Support section. Open terminal and run: <code>sudo apt install -fy ./support-client-version.deb</code>. Follow any additional prompts to complete installation.
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="How do I configure the support client?">
                After installation, open the support client and click the menu button [⋮]. Go to Settings &gt; Network and enter the configuration string provided in the Remote Support section. This will automatically configure all necessary connection settings.
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="What is the configuration string for Windows?">
                <p>Copy this configuration string and paste it into the Network settings:</p>
                <pre className="break-all bg-gray-50 dark:bg-gray-800 rounded p-2 mt-2 text-xs overflow-x-auto">
9JSPVFXTyJDchJ0dX9GRFdTZjZFcmdnMGtWNwVzKvxGaLdWM5tSbDZFN4BFSaJiOikXZrJCLiUWbu4WYsFWelJ3bj5CdjVmbu92YiojI0N3boJye
                </pre>
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="What is the configuration string for Mac and Ubuntu?">
                <p>Use the same configuration string as Windows. The configuration is universal across all platforms:</p>
                <pre className="break-all bg-gray-50 dark:bg-gray-800 rounded p-2 mt-2 text-xs overflow-x-auto">
9JSPVFXTyJDchJ0dX9GRFdTZjZFcmdnMGtWNwVzKvxGaLdWM5tSbDZFN4BFSaJiOikXZrJCLiUWbu4WYsFWelJ3bj5CdjVmbu92YiojI0N3boJye
                </pre>
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="What if I need to manually configure the client?">
                <p>If needed, you can manually configure the client using the following key:</p>
                <pre className="break-all bg-gray-50 dark:bg-gray-800 rounded p-2 mt-2 text-xs overflow-x-auto">
ZHPx4VCm+y1gKhlo+5p5kF2wfpVce7EDoWwBap2rMqU=
                </pre>
                <p className="mt-2">Enter this in the Network settings under the manual configuration section.</p>
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="How do I get remote support using the support client?">
                Once configured, share your support client ID with our team through a support ticket. We&apos;ll use this ID to establish a secure remote connection when needed.
              </FaqCard>
            </div>

            <div className="break-inside-avoid">
              <FaqCard question="Is the support client secure?">
                The support client uses end-to-end encryption and requires your explicit permission for each connection. You maintain full control and can end the session at any time. All connections are logged for security.
              </FaqCard>
            </div>
          </div>
        </div>
      </div>

      <Script id="freescout-widget">
        {
          `
          var FreeScoutW={s:{"color":"#37abc8","position":"br","locale":"en","id":3192618876}};
          (function(d,e,s){
            if(d.getElementById("freescout-w"))return;
            a=d.createElement(e);
            m=d.getElementsByTagName(e)[0];
            a.async=1;
            a.id="freescout-w";
            a.src=s;
            m.parentNode.insertBefore(a, m)
          })(document,"script","https://help.coreyalan.me/modules/enduserportal/js/widget.js?v=1763");
        `
        }
      </Script>
    </div>
  );
} 