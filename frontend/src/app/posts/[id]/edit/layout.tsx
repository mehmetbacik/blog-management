'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';

export default function EditPostLayout({
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