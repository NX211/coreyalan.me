'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpload, 
  faFilePdf, 
  faFileWord, 
  faFileImage,
  faFileAlt,
  faTimes,
  faCheck,
  faExclamationCircle,
  faAngleRight,
  faArrowLeft,
  faInfoCircle,
  faCloudUploadAlt,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';

interface FileWithPreview extends File {
  preview?: string;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/msword': ['.doc'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'text/plain': ['.txt'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
}

export default function DocumentUploadPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: file.type.startsWith('image/') 
          ? URL.createObjectURL(file) 
          : undefined
      })
    );
    
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
  });

  const removeFile = (index: number) => {
    setFiles(files => {
      const newFiles = [...files];
      const fileToRemove = newFiles[index];
      
      // Revoke object URL if preview exists
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    setSuccessMessage(null);

    // Create a FormData object to send the files
    const formData = new FormData();
    
    // Add client email for folder organization - you can customize this
    // In a real app, you might get this from user authentication
    formData.append('clientEmail', 'client@example.com');
    
    // Add all files to the FormData
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    // Set up progress tracking
    let uploadProgress = 0;
    const progressInterval = setInterval(() => {
      if (uploadProgress < 90) {
        uploadProgress += 5;
        setUploadProgress(uploadProgress);
      }
    }, 300);

    try {
      // Call our API endpoint to upload files to Google Drive
      const response = await fetch('/api/upload/google-drive', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_UPLOAD_API_KEY || '',
        },
        body: formData,
      });

      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload files');
      }

      const result = await response.json();
      
      setUploadProgress(100);
      setSuccessMessage(
        `Files uploaded successfully! ${result.files.length} file(s) are now available in your shared Google Drive folder.`
      );
      
      // Clear files after successful upload
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      setFiles([]);
      toast.success('Files uploaded successfully!');
    } catch (err) {
      clearInterval(progressInterval);
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload files. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return faFilePdf;
    if (file.type.includes('word') || file.type.includes('doc')) return faFileWord;
    if (file.type.includes('image')) return faFileImage;
    return faFileAlt;
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="Upload Documents" 
        description="Share Files Securely Through Our Google Drive Integration"
      />
      
      <div className="container mx-auto px-4 py-12 dark:bg-[#0F172A]">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <Link href="/client-portal" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
            Client Portal
          </Link>
          <FontAwesomeIcon icon={faAngleRight} className="mx-2 h-3 w-3 text-gray-400" />
          <Link href="/client-portal/documents" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
            Documents
          </Link>
          <FontAwesomeIcon icon={faAngleRight} className="mx-2 h-3 w-3 text-gray-400" />
          <span className="text-primary">Upload</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Upload Section */}
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                <FontAwesomeIcon 
                  icon={faCloudUploadAlt} 
                  className="text-white h-10 w-10 mb-4"
                />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Upload Files
                </h2>
                <p className="text-green-100">
                  Upload documents to share with Corey Alan
                </p>
              </div>
              <div className="p-6">
                {/* Dropzone */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 mb-6 ${
                    isDragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 dark:border-gray-600'
                  } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <input {...getInputProps()} />
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <FontAwesomeIcon
                        icon={faUpload}
                        className="h-12 w-12 text-gray-400 dark:text-gray-500"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {isDragActive
                          ? 'Drop the files here'
                          : 'Drag and drop your files here'}
                      </p>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        or click to browse files
                      </p>
                      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                        PDF, DOCX, JPG, PNG, XLSX, and more (Max 50MB per file)
                      </p>
                    </div>
                  </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Selected Files ({files.length})
                    </h3>
                    <div className="space-y-3">
                      {files.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-4">
                            <FontAwesomeIcon
                              icon={getFileIcon(file)}
                              className="h-8 w-8 text-primary"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          {!isUploading && (
                            <button
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                              aria-label="Remove file"
                            >
                              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
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

                {/* Success Message */}
                {successMessage && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-start">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                      />
                      <p className="text-sm text-green-700 dark:text-green-400">{successMessage}</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-start">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="h-5 w-5 text-red-500 mt-0.5 mr-2"
                      />
                      <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Link 
                    href="/client-portal/documents" 
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 mr-2" />
                    Back to Documents
                  </Link>
                  <button
                    onClick={uploadFiles}
                    disabled={isUploading || files.length === 0}
                    className={`px-6 py-3 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors ${
                      (isUploading || files.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUploading ? 'Uploading...' : 'Upload Files'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Instructions Card */}
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-0">
                  Upload Instructions
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Files will be uploaded to a secure shared Google Drive folder
                    </p>
                  </li>
                  <li className="flex">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Maximum file size: 50MB per file
                    </p>
                  </li>
                  <li className="flex">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Accepted formats: PDF, Word, Excel, Images, Text files
                    </p>
                  </li>
                  <li className="flex">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Please do not upload sensitive personal information
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 h-5 w-5 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Need Help?</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                    If you're having trouble uploading files, please contact our support team.
                  </p>
                  <a
                    href="https://help.coreyalan.me/help/3530376337"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 