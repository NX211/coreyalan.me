'use client';

import { FormField } from '@/types/forms';

interface CompanyInputProps extends Omit<FormField, 'type'> {
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
}

export default function CompanyInput({
  name = 'company',
  label = 'Company Name',
  required = false,
  placeholder = 'Enter your company name',
  value,
  onChange,
  error
}: CompanyInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
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