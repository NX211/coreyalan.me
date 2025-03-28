'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary dark:text-white mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We apologize for the inconvenience. Please try again later.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center text-primary dark:text-white hover:text-primary-dark dark:hover:text-gray-300 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 