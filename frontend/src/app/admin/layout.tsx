'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { MobileNav } from '@/components/admin/MobileNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <nav className="admin-nav">
          <Link 
            href="/admin"
            className={`admin-nav__link ${isActive('/admin') ? 'admin-nav__link--active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/posts"
            className={`admin-nav__link ${isActive('/admin/posts') ? 'admin-nav__link--active' : ''}`}
          >
            Posts
          </Link>
          <Link 
            href="/admin/users"
            className={`admin-nav__link ${isActive('/admin/users') ? 'admin-nav__link--active' : ''}`}
          >
            Users
          </Link>
        </nav>
      </aside>
      <main className="admin-layout__main">
        {children}
      </main>
      <MobileNav />
    </div>
  );
} 