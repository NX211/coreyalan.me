import { toast } from 'react-hot-toast';

const DOCUSEAL_API_URL = 'https://api.docuseal.com/v1';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface UploadResponse {
  id: string;
  name: string;
  status: string;
  created_at: string;
}

interface ApiError {
  message: string;
  code?: string;
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
): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetchWithRetry(`${DOCUSEAL_API_URL}/documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DOCUSEAL_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Failed to upload document');
    }

    const data: UploadResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Document upload error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to upload document'
    );
  }
}

export async function getDocumentStatus(documentId: string): Promise<UploadResponse> {
  try {
    const response = await fetchWithRetry(
      `${DOCUSEAL_API_URL}/documents/${documentId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DOCUSEAL_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Failed to get document status');
    }

    const data: UploadResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Document status error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get document status'
    );
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