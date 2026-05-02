import { useCallback, useState } from 'react';
import { isValidEmail, isValidPhoneNumber } from '@/utils';

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = useCallback((email: string): boolean => {
    const isValid = isValidEmail(email);
    if (!isValid) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
    } else {
      setErrors((prev) => {
        const { email: _, ...rest } = prev;
        return rest;
      });
    }
    return isValid;
  }, []);

  const validatePhone = useCallback((phone: string): boolean => {
    const isValid = isValidPhoneNumber(phone);
    if (!isValid) {
      setErrors((prev) => ({ ...prev, phone: 'Invalid phone number' }));
    } else {
      setErrors((prev) => {
        const { phone: _, ...rest } = prev;
        return rest;
      });
    }
    return isValid;
  }, []);

  const validateRequired = useCallback((value: string, fieldName: string): boolean => {
    const isValid = value.trim().length > 0;
    if (!isValid) {
      setErrors((prev) => ({ ...prev, [fieldName]: `${fieldName} is required` }));
    } else {
      setErrors((prev) => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    }
    return isValid;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateEmail,
    validatePhone,
    validateRequired,
    clearErrors,
  };
}
