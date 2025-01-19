'use client';

import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Create an Account</h1>
      <p className="auth-page__subtitle">
        Join our community and start sharing your thoughts
      </p>
      <RegisterForm />
    </div>
  );
} 