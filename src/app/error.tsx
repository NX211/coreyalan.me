'use client';

import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { ClientLogger } from '@/lib/security/clientLogger';

export default function RootErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleError = async (error: Error, errorInfo: React.ErrorInfo) => {
    await ClientLogger.logError(error, errorInfo);
  };

  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  );
} 