'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export const AuthGuard = ({ children, requireAuth = false, requireAdmin = false }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push(`/login?redirect=${pathname}`);
        return;
      }

      if (requireAdmin && (!user || user.role !== 'admin')) {
        router.push('/');
        return;
      }

      setIsAuthorized(true);
    }
  }, [user, loading, requireAuth, requireAdmin, router, pathname]);

  if (loading || !isAuthorized) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}; 