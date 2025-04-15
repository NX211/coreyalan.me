'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Icon from '@/components/ui-components/Icon';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  maxSize: number;
  allowedTypes: string[];
}

export default function UploadZone({ onFileSelect, maxSize, allowedTypes }: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`mt-1 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10 ${
        isDragActive ? 'border-primary bg-primary/5' : ''
      }`}
    >
      <div className="text-center">
        <Icon
          icon={faUpload}
          className="mx-auto h-12 w-12 text-gray-400"
        />
        <div className="mt-4 flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark"
          >
            <span>Upload a file</span>
            <input {...getInputProps()} />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {allowedTypes.join(', ')} up to {maxSize / (1024 * 1024)}MB
        </p>
      </div>
    </div>
  );
} 