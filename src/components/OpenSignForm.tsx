'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface OpenSignFormProps {
  src: string;
  email?: string;
  name?: string;
  role?: string;
  expand?: boolean;
  minimize?: boolean;
  preview?: boolean;
  backgroundColor?: string;
  theme?: 'light' | 'dark' | 'auto';
  externalId?: string;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

const OpenSignForm: React.FC<OpenSignFormProps> = ({
  src,
  email = '',
  name = '',
  role = '',
  expand = true,
  minimize = false,
  preview = false,
  backgroundColor = '',
  theme = 'auto',
  externalId = '',
  className = '',
  style = {},
  onComplete,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const elementAddedRef = useRef(false);

  const handleError = useCallback((err: Error | string) => {
    const errorObj = err instanceof Error ? err : new Error(err);
    setError(errorObj);
    onError?.(errorObj);
    toast.error(errorObj.message);
  }, [onError]);

  // Load OpenSign client script once
  useEffect(() => {
    let isMounted = true;
    
    // Load OpenSign client script
    const loadScript = () => {
      const scriptId = 'opensign-form-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://cdn.opensignlabs.com/js/form.js';
        script.async = true;
        script.onload = () => {
          if (isMounted) {
            setIsLoaded(true);
          }
        };
        script.onerror = () => {
          if (isMounted) {
            handleError('Failed to load OpenSign form script');
          }
        };
        document.head.appendChild(script);
      } else {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    loadScript();

    return () => {
      isMounted = false;
    };
  }, [handleError]);

  // Setup message listener for form completion
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        typeof event.data === 'object' &&
        event.data.type === 'opensign:form:complete'
      ) {
        onComplete?.();
        toast.success('Document signed successfully!');
      }
      
      if (
        event.data &&
        typeof event.data === 'object' &&
        event.data.type === 'opensign:form:error'
      ) {
        handleError(event.data.message || 'An error occurred with the form');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onComplete, handleError]);

  // Create form element in the DOM when component mounts or parameters change
  useEffect(() => {
    if (!formContainerRef.current || !isLoaded || error) return;

    // Capture the ref's current value for use in cleanup
    const container = formContainerRef.current; 
    let formElement: HTMLElement | null = null;
    
    try {
      // Clear previous form - safely check if there are any children first
      if (container.children.length > 0 && elementAddedRef.current) {
        container.innerHTML = '';
      }

      // Create new form element
      formElement = document.createElement('opensign-form');
      formElement.setAttribute('data-src', src);
      if (email) formElement.setAttribute('data-email', email);
      if (name) formElement.setAttribute('data-name', name);
      if (role) formElement.setAttribute('data-role', role);
      if (externalId) formElement.setAttribute('data-external-id', externalId);
      formElement.setAttribute('data-expand', String(expand));
      formElement.setAttribute('data-minimize', String(minimize));
      formElement.setAttribute('data-preview', String(preview));
      if (backgroundColor) formElement.setAttribute('data-background-color', backgroundColor);
      formElement.setAttribute('data-theme', theme);

      // Append to container
      container.appendChild(formElement);
      elementAddedRef.current = true;
    } catch (err) {
      console.error('Error creating form element:', err);
      handleError('Failed to create document signing form');
    }

    // Cleanup function
    return () => {
      try {
        // Use the captured container variable in cleanup
        if (container && formElement && container.contains(formElement)) { 
          container.removeChild(formElement);
        }
      } catch (err) {
        console.error('Error during cleanup:', err);
      }
    };
  }, [
    src, email, name, role, expand, minimize, preview, 
    backgroundColor, theme, externalId, error, isLoaded, handleError
  ]);

  return (
    <div 
      ref={formContainerRef}
      className={`opensign-form-container ${className}`}
      style={{
        width: '100%',
        minHeight: '600px',
        ...style,
      }}
    >
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">{error.message}</p>
          <button 
            className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
            onClick={() => {
              setError(null);
              elementAddedRef.current = false;
            }}
          >
            Retry
          </button>
        </div>
      )}
      
      {!isLoaded && !error && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default OpenSignForm; 