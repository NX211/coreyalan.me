'use client';

import Icon from '@/components/ui-components/Icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <div className="mt-2 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
          <span className="text-sm font-medium text-gray-500">
            {file.name.split('.').pop()?.toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{file.name}</p>
          <p className="text-xs text-gray-500">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
      >
        <Icon icon={faTimes} className="h-5 w-5" />
      </button>
    </div>
  );
} 