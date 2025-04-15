'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // The redirect will be handled by the API response
    } catch (err) {
      setError('Failed to logout. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
      {error && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-red-100 text-red-700 text-sm rounded">
          {error}
        </div>
      )}
    </div>
  );
} 