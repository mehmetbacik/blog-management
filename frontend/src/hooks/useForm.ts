import { useState } from 'react';
import { z } from 'zod';

interface UseFormProps<T> {
  schema: z.ZodType<T>;
  onSubmit: (data: T) => Promise<void>;
}

interface FormState {
  errors: { [key: string]: string | undefined };
  isSubmitting: boolean;
}

export function useForm<T>({ schema, onSubmit }: UseFormProps<T>) {
  const [formState, setFormState] = useState<FormState>({
    errors: {},
    isSubmitting: false,
  });

  const validateField = (name: string, value: any) => {
    try {
      schema.shape[name].parse(value);
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: undefined
        }
      }));
      return true;
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        setFormState(prev => ({
          ...prev,
          errors: {
            ...prev.errors,
            [name]: error.errors[0].message
          }
        }));
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const validatedData = schema.parse(data);
      await onSubmit(validatedData as T);
      setFormState({ errors: {}, isSubmitting: false });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce<{ [key: string]: string }>((acc, curr) => {
          const path = curr.path[0] as string;
          acc[path] = curr.message;
          return acc;
        }, {});

        setFormState(prev => ({
          ...prev,
          errors,
          isSubmitting: false
        }));
      }
    }
  };

  return {
    handleSubmit,
    validateField,
    formState,
  };
} 