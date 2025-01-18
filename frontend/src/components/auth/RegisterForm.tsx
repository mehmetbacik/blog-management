import { useForm } from '@/hooks/useForm';
import { registerSchema } from '@/validations/schemas';
import { authService } from '@/services/api';
import { showToast } from '@/utils/toast';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { handleSubmit, validateField, formState } = useForm<RegisterFormData>({
    schema: registerSchema,
    onSubmit: async (data) => {
      try {
        const { confirmPassword, ...registerData } = data;
        await authService.register(registerData);
        showToast.success('Registration successful!');
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

      {/* Other form fields follow the same pattern */}
      
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