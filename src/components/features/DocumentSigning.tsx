'use client';

import { useState } from 'react';
import Icon from '@/components/ui-components/Icon';
import { faSignature } from '@fortawesome/free-solid-svg-icons';

interface DocumentSigningProps {
  documentId: string;
  onSignComplete?: () => void;
}

export default function DocumentSigning({ documentId, onSignComplete }: DocumentSigningProps) {
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    try {
      setIsSigning(true);
      setError(null);

      const response = await fetch(`/api/documents/${documentId}/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to sign document');
      }

      onSignComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signing');
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleSign}
        disabled={isSigning}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon icon={faSignature} className="mr-2 h-4 w-4" />
        {isSigning ? 'Signing...' : 'Sign Document'}
      </button>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
} 