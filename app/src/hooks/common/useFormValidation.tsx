/**
 * Reusable form validation hook
 * Eliminates duplicate validation logic across useLogin, useRegistration, etc.
 */

import { useState, useCallback } from 'react';
import * as Yup from 'yup';

export interface UseFormValidationResult<T> {
  errors: { [key: string]: string };
  validateField: (field: keyof T, value: any) => Promise<boolean>;
  validateAll: (data: T, schema: Yup.ObjectSchema<any>) => Promise<boolean>;
  clearErrors: () => void;
  setFieldError: (field: string, error: string) => void;
}

export const useFormValidation = <T extends object>(): UseFormValidationResult<T> => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = useCallback(async (field: keyof T): Promise<boolean> => {
    try {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
      return true;
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [field as string]: error.message,
      }));
      return false;
    }
  }, []);

  const validateAll = useCallback(
    async (data: T, schema: Yup.ObjectSchema<any>): Promise<boolean> => {
      try {
        await schema.validate(data, { abortEarly: false });
        setErrors({});
        return true;
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: { [key: string]: string } = {};
          err.inner.forEach((error) => {
            if (error.path) {
              validationErrors[error.path] = error.message;
            }
          });
          setErrors(validationErrors);
        }
        return false;
      }
    },
    []
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  return {
    errors,
    validateField,
    validateAll,
    clearErrors,
    setFieldError,
  };
};
