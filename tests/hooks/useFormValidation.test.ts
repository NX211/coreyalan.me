import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '@/hooks/useFormValidation';
import { contactFormDataSchema } from '@/types/forms';

describe('useFormValidation', () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  it('should initialize with empty values and no errors', () => {
    const { result } = renderHook(() => 
      useFormValidation({ schema: contactFormDataSchema, initialValues })
    );

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isValid).toBe(false);
  });

  it('should validate field on change', () => {
    const { result } = renderHook(() => 
      useFormValidation({ schema: contactFormDataSchema, initialValues })
    );

    act(() => {
      result.current.handleChange('name', 'Test User');
    });

    expect(result.current.values.name).toBe('Test User');
    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.touched.name).toBe(true);
  });

  it('should show validation errors for invalid input', () => {
    const { result } = renderHook(() => 
      useFormValidation({ schema: contactFormDataSchema, initialValues })
    );

    act(() => {
      result.current.handleChange('email', 'invalid-email');
    });

    expect(result.current.errors.email).toBeDefined();
    expect(result.current.isValid).toBe(false);
  });

  it('should validate entire form', () => {
    const { result } = renderHook(() => 
      useFormValidation({ schema: contactFormDataSchema, initialValues })
    );

    act(() => {
      result.current.setValues({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message'
      });
    });

    const isValid = result.current.validateForm();
    expect(isValid).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it('should handle field blur', () => {
    const { result } = renderHook(() => 
      useFormValidation({ schema: contactFormDataSchema, initialValues })
    );

    act(() => {
      result.current.handleBlur('name');
    });

    expect(result.current.touched.name).toBe(true);
  });
}); 