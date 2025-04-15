'use client';

interface ErrorDisplayProps {
  error: string;
}

function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
      <p className="text-center">{error}</p>
    </div>
  );
}

export default ErrorDisplay; 