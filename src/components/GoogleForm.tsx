'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface GoogleFormProps {
  formId: string;
  title?: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

const GoogleForm: React.FC<GoogleFormProps> = ({
  formId,
  title = 'Contact Form',
  description = 'Please fill out the form below.',
  className = '',
  style = {},
  onComplete,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!formId) {
      const errorMsg = 'Form ID is required';
      setError(errorMsg);
      if (onError) onError(new Error(errorMsg));
      return;
    }

    // Listen for form submission
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://docs.google.com' && event.data === 'form-submit') {
        setIsSubmitted(true);
        if (onComplete) onComplete();
        toast.success('Form submitted successfully!');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [formId, onError, onComplete]);

  if (!formId) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">Form ID is required</p>
      </div>
    );
  }

  const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true&usp=pp_url`;

  return (
    <div className={`google-form-wrapper ${className}`} style={style}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      
      {isSubmitted ? (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-lg">
          <p className="text-center">
            Thank you for your submission! I'll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
          {!isLoaded && !error && (
            <div className="absolute inset-0 flex justify-center items-center bg-white dark:bg-gray-800 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          <iframe
            src={formUrl}
            width="100%"
            height="700"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              minHeight: '700px'
            }}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              const errorMsg = 'Failed to load Google Form';
              setError(errorMsg);
              if (onError) onError(new Error(errorMsg));
              toast.error(errorMsg);
            }}
          />
          
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button 
                className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                onClick={() => {
                  setError(null);
                  setIsLoaded(false);
                }}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleForm; 