'use client';

import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Welcome Back</h1>
      <p className="auth-page__subtitle">
        Sign in to continue to your account
      </p>
      <LoginForm />
    </div>
  );
} 