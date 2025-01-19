'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';

export default function RegisterLayout({
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