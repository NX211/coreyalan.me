import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export function LoginCard(): JSX.Element {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6 relative" style={{ height: '500px' }}>
      <div style={{ paddingBottom: '60px' }}>
        <div className="flex flex-col items-center text-center mb-4">
          <FontAwesomeIcon 
            icon={faSignInAlt} 
            className="text-[#37abc8] h-6 w-6 mb-3" 
          />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Login</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
          Sign in to access your account, view invoices, manage your subscription, and more.
        </p>
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Features:</h3>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1 inline-block text-left">
            <li>View and Download Invoices</li>
            <li>Update Payment Methods</li>
            <li>Manage Subscription</li>
            <li>View Payment History</li>
          </ul>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <Link
          href="/auth/login"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
        >
          Sign In to Your Account
        </Link>
      </div>
    </div>
  );
} 