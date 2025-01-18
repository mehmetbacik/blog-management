import { useForm } from '@/hooks/useForm';
import { registerSchema } from '@/validations/schemas';
import { authService } from '@/services/api';
import { showToast } from '@/utils/toast';
import { useRouter } from 'next/navigation';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const { handleSubmit, validateField, formState } = useForm<RegisterFormData>({
    schema: registerSchema,
    onSubmit: async (data) => {
      try {
        const { confirmPassword, ...registerData } = data;
        await authService.register(registerData);
        showToast.success('Registration successful!');
        router.push('/login');
      } catch (error) {
        showToast.error('Failed to register');
      }
    }
  });

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__group">
        <label htmlFor="username" className="form__label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="form__input"
          onBlur={(e) => validateField('username', e.target.value)}
        />
        {formState.errors.username && (
          <span className="form__error">{formState.errors.username}</span>
        )}
      </div>

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

      <div className="form__group">
        <label htmlFor="confirmPassword" className="form__label">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="form__input"
          onBlur={(e) => validateField('confirmPassword', e.target.value)}
        />
        {formState.errors.confirmPassword && (
          <span className="form__error">{formState.errors.confirmPassword}</span>
        )}
      </div>
      
      <button 
        type="submit" 
        className="button"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}; 