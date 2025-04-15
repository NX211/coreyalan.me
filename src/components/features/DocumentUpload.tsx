'use client';

import { useState, useCallback } from 'react';
import { Document, DocumentUploadFormData, ErrorResponse } from '@/types';
import UploadZone from './UploadZone';
import FilePreview from './FilePreview';
import UploadStatus from './UploadStatus';

interface DocumentUploadProps {
  onUploadSuccess?: (document: Document) => void;
  onUploadError?: (error: ErrorResponse) => void;
  maxSize?: number;
  allowedTypes?: string[];
}

export default function DocumentUpload({
  onUploadSuccess,
  onUploadError,
  maxSize = 10 * 1024 * 1024, // 10MB default
  allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
}: DocumentUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<ErrorResponse | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (file.size > maxSize) {
      const error: ErrorResponse = {
        message: 'File size exceeds the maximum limit',
        code: 'FILE_TOO_LARGE',
        details: { maxSize, fileSize: file.size }
      };
      setError(error);
      onUploadError?.(error);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      const error: ErrorResponse = {
        message: 'File type not allowed',
        code: 'INVALID_FILE_TYPE',
        details: { allowedTypes, fileType: file.type }
      };
      setError(error);
      onUploadError?.(error);
      return;
    }

    setUploadedFile(file);
    setError(null);
  }, [maxSize, allowedTypes, onUploadError]);

  const handleUpload = useCallback(async (formData: DocumentUploadFormData) => {
    setUploadStatus('uploading');
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.file);
      if (formData.description) {
        formDataToSend.append('description', formData.description);
      }
      if (formData.tags) {
        formData.tags.forEach(tag => formDataToSend.append('tags', tag));
      }

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const document: Document = await response.json();
      setUploadStatus('success');
      onUploadSuccess?.(document);
    } catch (err) {
      const error: ErrorResponse = {
        message: err instanceof Error ? err.message : 'Upload failed',
        code: 'UPLOAD_ERROR'
      };
      setError(error);
      setUploadStatus('error');
      onUploadError?.(error);
    }
  }, [onUploadSuccess, onUploadError]);

  return (
    <div className="space-y-4">
      <UploadZone
        onFileSelect={handleFileSelect}
        maxSize={maxSize}
        allowedTypes={allowedTypes}
      />
      
      {uploadedFile && (
        <FilePreview
          file={uploadedFile}
          onRemove={() => {
            setUploadedFile(null);
            setError(null);
          }}
        />
      )}

      <UploadStatus
        status={uploadStatus}
        error={error || undefined}
        onRetry={() => uploadedFile && handleUpload({ file: uploadedFile })}
      />
    </div>
  );
} 