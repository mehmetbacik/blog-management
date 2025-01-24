'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { MobileNav } from '@/components/admin/MobileNav';
import { ThemeToggle } from '@/components/admin/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <AuthGuard requireAuth requireAdmin>
      <div className="admin-layout">
        <aside className="admin-layout__sidebar">
          <div className="admin-nav">
            <div className="admin-nav__links">
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
            </div>
            <div className="admin-nav__footer">
              <ThemeToggle />
              <button 
                onClick={handleLogout}
                className="button button--outline"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>
        <main className="admin-layout__main">
          <div className="container">
            {children}
          </div>
        </main>
        <MobileNav />
      </div>
    </AuthGuard>
  );
} 