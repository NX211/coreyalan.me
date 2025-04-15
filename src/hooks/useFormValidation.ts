import { useState, useCallback } from 'react';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(5, 'Email must be at least 5 characters'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .regex(/^[a-zA-Z0-9\s.,!?-]+$/, 'Message can only contain letters, numbers, and basic punctuation'),
});

type FormData = z.infer<typeof contactFormSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export function useFormValidation() {
  const [values, setValues] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = useCallback((field: keyof FormData, value: string) => {
    try {
      contactFormSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  }, []);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  }, [validateField]);

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const validateForm = useCallback(() => {
    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach(error => {
        const field = error.path[0] as keyof FormData;
        newErrors[field] = error.message;
      });
      setErrors(newErrors);
      setIsValid(false);
      return false;
    }
    setErrors({});
    setIsValid(true);
    return true;
  }, [values]);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm,
    setValues,
  };
} 