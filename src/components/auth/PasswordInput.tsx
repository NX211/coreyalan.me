'use client';

import { useState } from 'react';
import { FormField } from '@/types/forms';
import Icon from '@/components/ui-components/Icon';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface PasswordInputProps extends Omit<FormField, 'type'> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showStrength?: boolean;
}

export default function PasswordInput({
  name,
  label,
  required = false,
  placeholder,
  value,
  onChange,
  error,
  showStrength = false
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    return {
      strength,
      label: strengthLabels[strength - 1] || ''
    };
  };

  const { strength, label: strengthLabel } = getPasswordStrength(value);

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {showStrength && value && (
          <span className={`text-xs font-medium ${
            strength === 1 ? 'text-red-500' :
            strength === 2 ? 'text-yellow-500' :
            strength === 3 ? 'text-blue-500' :
            'text-green-500'
          }`}>
            {strengthLabel}
          </span>
        )}
      </div>
      <div className="relative mt-1">
        <input
          type={showPassword ? 'text' : 'password'}
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
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <Icon
            icon={showPassword ? faEyeSlash : faEye}
            className="h-5 w-5 text-gray-400 hover:text-gray-500"
          />
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {showStrength && value && (
        <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              strength === 1 ? 'bg-red-500' :
              strength === 2 ? 'bg-yellow-500' :
              strength === 3 ? 'bg-blue-500' :
              'bg-green-500'
            }`}
            style={{ width: `${(strength / 4) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
} 