'use client';

import { useForm } from '@/hooks/useForm';
import { loginSchema } from '@/validations/schemas';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/utils/toast';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();

  const { handleSubmit, validateField, formState } = useForm<LoginFormData>({
    schema: loginSchema,
    onSubmit: async (data) => {
      try {
        const user = await login(data.email, data.password);
        showToast.success('Login successful!');
        
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        showToast.error('Invalid credentials');
      }
    }
  });

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form__input"
          onBlur={(e) => validateField('email', e.target.value)}
        />
        {formState.errors.email && (
          <span className="form__error">{formState.errors.email}</span>
        )}
      </div>

      <div className="form__group">
        <label htmlFor="password" className="form__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form__input"
          onBlur={(e) => validateField('password', e.target.value)}
        />
        {formState.errors.password && (
          <span className="form__error">{formState.errors.password}</span>
        )}
      </div>

      <button 
        type="submit" 
        className="button"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}; 