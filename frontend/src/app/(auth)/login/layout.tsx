'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireGuest>
      {children}
    </AuthGuard>
  );
} 