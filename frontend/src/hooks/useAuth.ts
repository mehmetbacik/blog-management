'use client';

import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/api';
import { User, AuthResponse } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getProfile();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string): Promise<User> => {
    const response: AuthResponse = await authService.login(email, password);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    
    const redirect = searchParams.get('redirect');
    if (redirect) {
      router.push(redirect);
    } else if (response.user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
    
    return response.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return { user, loading, login, logout, refreshUser: checkAuth };
}; 