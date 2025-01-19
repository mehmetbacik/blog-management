'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
  allowedRoles?: string[];
}

export const AuthGuard = ({ 
  children, 
  requireAuth = false,
  requireGuest = false,
  allowedRoles = [] 
}: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push('/login');
      } else if (requireGuest && user) {
        router.push('/dashboard');
      } else if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.push('/');
      }
    }
  }, [loading, user, requireAuth, requireGuest, allowedRoles, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (requireAuth && !user) {
    return null;
  }

  if (requireGuest && user) {
    return null;
  }

  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}; 