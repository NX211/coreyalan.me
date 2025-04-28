'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);

  useEffect(() => {
    // Check if the user was redirected after registration
    const registered = searchParams?.get('registered');
    if (registered === 'true') {
      setIsRegistered(true);
    }

    // Check if there's a returnUrl
    const returnUrl = searchParams?.get('returnUrl');
    if (returnUrl) {
      // Store this for later redirect after login
      localStorage.setItem('returnUrl', returnUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          otp: showOtpField ? otp : undefined 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if we need to show OTP field (2FA)
        if (response.status === 401 && data.message?.includes('two-factor')) {
          setShowOtpField(true);
          setError('Please enter your two-factor authentication code');
          setIsLoading(false);
          return;
        }
        
        throw new Error(data.message || 'Login failed');
      }

      // Get stored returnUrl if it exists
      const returnUrl = localStorage.getItem('returnUrl');
      if (returnUrl) {
        localStorage.removeItem('returnUrl');
        router.push(returnUrl);
      } else {
        router.push('/client-portal/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isRegistered && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-600 dark:text-green-400">
            Registration successful! Please sign in with your credentials.
          </p>
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 flex items-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-5 w-5" />
            {error}
          </p>
        </div>
      )}

      {/* Add development mode notice and link */}
      {process.env.NODE_ENV === 'development' && process.env.DEV_AUTH_ENABLED === 'true' && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-600 dark:text-blue-400 flex items-center">
            <span className="mr-2">🛠️</span>
            Development Mode: <a href="/dev-login" className="underline font-semibold ml-1">Use Dev Login</a>
          </p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
            placeholder="Enter your password"
          />
        </div>
      </div>

      {showOtpField && (
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Two-Factor Authentication Code
          </label>
          <div className="relative">
            <input
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
              placeholder="Enter your 2FA code"
            />
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>

      <div className="text-center space-y-2">
        <div>
          <a
            href="/auth/forgot-password"
            className="text-sm text-primary hover:text-primary-dark"
          >
            Forgot your password?
          </a>
        </div>
        <div>
          <Link
            href="/auth/register"
            className="text-sm text-primary hover:text-primary-dark"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}

function LoginFormWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

export default function LoginPage() {
  return (
    <div className="pt-24 pb-16">
      <PageHeader 
        title="Client Portal Login" 
        description="Sign in to access your account"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-8">
          <LoginFormWrapper />
        </div>
      </div>
    </div>
  );
} 