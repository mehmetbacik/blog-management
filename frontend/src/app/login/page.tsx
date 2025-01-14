'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/utils/toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = showToast.loading('Logging in...');
    
    try {
      await login(email, password);
      showToast.dismiss(loadingToast);
      showToast.success('Successfully logged in!');
    } catch (err) {
      showToast.dismiss(loadingToast);
      showToast.error('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form__input"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form__input"
              required
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
} 