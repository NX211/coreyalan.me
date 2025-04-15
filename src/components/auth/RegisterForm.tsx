'use client';

import { useState } from 'react';
import { RegisterFormData } from '@/types/forms';
import FormInput from '../forms/FormInput';
import PasswordInput from './PasswordInput';
import CompanyInput from './CompanyInput';
import ErrorDisplay from '../forms/ErrorDisplay';
import { formSchemas } from '@/types/forms';
import { z } from 'zod';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

interface FormErrors extends Partial<Record<keyof RegisterFormData, string>> {
  general?: string;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = formSchemas.registerFormData.parse(formData);
      setIsSubmitting(true);
      await onSubmit(validatedData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        err.errors.forEach((error) => {
          const field = error.path[0] as keyof RegisterFormData;
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ 
          general: err instanceof Error ? err.message : 'Registration failed' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && <ErrorDisplay error={errors.general} />}

      <FormInput
        name="name"
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        error={errors.name}
        required
      />

      <FormInput
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => handleChange('email', value)}
        error={errors.email}
        required
      />

      <PasswordInput
        name="password"
        label="Password"
        value={formData.password}
        onChange={(value) => handleChange('password', value)}
        error={errors.password}
        required
        showStrength
      />

      <PasswordInput
        name="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={(value) => handleChange('confirmPassword', value)}
        error={errors.confirmPassword}
        required
      />

      <CompanyInput
        name="company"
        label="Company Name"
        value={formData.company || ''}
        onChange={(value) => handleChange('company', value)}
        error={errors.company}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
} 