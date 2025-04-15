'use client';

import { FormField } from '@/types/forms';

interface FormTextareaProps extends Omit<FormField, 'type'> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
}

export default function FormTextarea({
  name,
  label,
  required = false,
  placeholder,
  value,
  onChange,
  error,
  rows = 4
}: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
} 