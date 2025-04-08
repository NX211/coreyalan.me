'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadDocument, handleApiError } from '@/lib/docuseal';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpload, 
  faFilePdf, 
  faFileWord, 
  faTimes,
  faCheckCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

interface DocumentUploadProps {
  onUploadSuccess?: (documentId: string) => void;
  onUploadError?: (error: string) => void;
}

const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/msword': ['.doc']
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function DocumentUpload({ onUploadSuccess, onUploadError }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const response = await uploadDocument(file, (progress) => {
        setUploadProgress(progress);
      });

      toast.success('Document uploaded successfully!');
      onUploadSuccess?.(response.id);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      toast.error(errorMessage);
      onUploadError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          {!selectedFile ? (
            <>
              <div className="flex justify-center">
                <FontAwesomeIcon
                  icon={faUpload}
                  className="h-12 w-12 text-gray-400 dark:text-gray-500"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {isDragActive
                    ? 'Drop the file here'
                    : 'Drag and drop your document here'}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  or click to browse files
                </p>
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  Supported formats: PDF, DOCX, DOC (Max 10MB)
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon
                  icon={selectedFile.type.includes('pdf') ? faFilePdf : faFileWord}
                  className="h-8 w-8 text-primary"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {!isUploading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="h-5 w-5 text-red-500"
            />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Uploading... {uploadProgress}%
            </p>
            {uploadProgress === 100 && (
              <div className="flex items-center space-x-1 text-green-500">
                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" />
                <span className="text-sm">Complete</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 