'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';

export default function NewPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireAuth>
      {children}
    </AuthGuard>
  );
} 