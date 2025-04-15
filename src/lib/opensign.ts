import { toast } from 'react-hot-toast';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export interface OpenSignDocument {
  id: string;
  name: string;
  status: string;
  created_at: string;
  documentUrl?: string;
}

interface ApiError {
  message: string;
  code?: string;
}

// Interface for document verification response
export interface VerificationResult {
  isValid: boolean;
  details?: {
    signedBy?: string;
    signedOn?: Date;
    documentHash?: string;
  };
  error?: string;
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = MAX_RETRIES
): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // Rate limit hit, wait and retry
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export async function uploadDocument(
  file: File,
  onProgress?: (progress: number) => void
): Promise<OpenSignDocument> {
  try {
    const formData = new FormData();
    formData.append('document', file);
    
    // Simulate progress for better UX since OpenSign API doesn't provide progress
    if (onProgress) {
      const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          if (progress >= 90) {
            clearInterval(interval);
          } else {
            onProgress(progress);
          }
        }, 200);
        return interval;
      };
      
      const progressInterval = simulateProgress();
      
      // Use Next.js API route
      const response = await fetchWithRetry(`/api/opensign/documents`, {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      onProgress(100);
      
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || 'Failed to upload document');
      }
      
      const data: OpenSignDocument = await response.json();
      return data;
    } else {
      // Use Next.js API route without progress tracking
      const response = await fetchWithRetry(`/api/opensign/documents`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || 'Failed to upload document');
      }
      
      const data: OpenSignDocument = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Document upload error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to upload document'
    );
  }
}

export async function getDocumentStatus(documentId: string): Promise<OpenSignDocument> {
  try {
    // Use Next.js API route
    const response = await fetchWithRetry(
      `/api/opensign/documents/${documentId}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Failed to get document status');
    }

    const data: OpenSignDocument = await response.json();
    return data;
  } catch (error) {
    console.error('Document status error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get document status'
    );
  }
}

export async function getSigningUrl(documentId: string): Promise<string> {
  try {
    const response = await fetchWithRetry(
      `/api/opensign/documents/${documentId}/signing-url`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Failed to get signing URL');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Get signing URL error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get signing URL'
    );
  }
}

/**
 * Verifies a signed document by checking its cryptographic signature and authenticity
 * @param documentId The OpenSign document ID
 * @returns VerificationResult object with validation status and details
 */
export async function verifySignedDocument(documentId: string): Promise<VerificationResult> {
  try {
    // Call your API endpoint for document verification
    const response = await fetchWithRetry(
      `/api/opensign/documents/${documentId}/verify`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      return {
        isValid: false,
        error: errorData.message || 'Failed to verify document'
      };
    }

    const data = await response.json();
    return {
      isValid: data.isValid,
      details: data.details
    };
  } catch (error) {
    console.error('Document verification error:', error);
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Failed to verify document'
    };
  }
}

export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('Failed to fetch')) {
      return 'Network error. Please check your connection and try again.';
    }
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
} 