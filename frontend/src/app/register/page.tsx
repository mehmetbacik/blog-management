'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';
import { showToast } from '@/utils/toast';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showToast.error('Passwords do not match');
      return;
    }

    const loadingToast = showToast.loading('Creating account...');

    try {
      const { confirmPassword, ...registerData } = formData;
      await authService.register(registerData);
      showToast.dismiss(loadingToast);
      showToast.success('Account created successfully!');
      router.push('/login');
    } catch (err) {
      showToast.dismiss(loadingToast);
      showToast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Register</h1>
        {error && <div className="form__error">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            <label htmlFor="username" className="form__label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form__input"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form__input"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="confirmPassword" className="form__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form__input"
              required
            />
          </div>
          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
} 