'use client';

import { useState } from 'react';
import { z } from 'zod';
import { contactFormDataSchema } from '@/types/forms';
import { useApiError } from '@/hooks/useApiError';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import ErrorDisplay from './ErrorDisplay';
import SuccessMessage from './SuccessMessage';

type ContactFormData = z.infer<typeof contactFormDataSchema>;

const initialValues: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

export function ContactForm() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Please enter your name';
    if (!formData.email) newErrors.email = 'Please enter a valid email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject) newErrors.subject = 'Please enter a subject';
    if (!formData.message) newErrors.message = 'Please enter your message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData(initialValues);
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} role="form" className="space-y-6">
      {submitStatus === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-lg">
          <p className="text-center">Message sent successfully! I'll get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
          <p className="text-center">Failed to send message. Please try again.</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) {
              const newErrors = { ...errors };
              delete newErrors.name;
              setErrors(newErrors);
            }
          }}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
            errors.name ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.name && <p data-testid="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) {
              const newErrors = { ...errors };
              delete newErrors.email;
              setErrors(newErrors);
            }
          }}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
            errors.email ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.email && <p data-testid="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subject <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={(e) => {
            setFormData({ ...formData, subject: e.target.value });
            if (errors.subject) {
              const newErrors = { ...errors };
              delete newErrors.subject;
              setErrors(newErrors);
            }
          }}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
            errors.subject ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.subject && <p data-testid="subject-error" className="mt-1 text-sm text-red-500">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) {
              const newErrors = { ...errors };
              delete newErrors.message;
              setErrors(newErrors);
            }
          }}
          rows={6}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
            errors.message ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.message && <p data-testid="message-error" className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
} 