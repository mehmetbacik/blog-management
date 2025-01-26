'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, [pathname, refreshUser]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__content">
          <Link href="/" className="navbar__logo">
            Blog Management
          </Link>

          <div className="navbar__links">
            <Link 
              href="/search" 
              className={`navbar__link ${pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>
            {user && user.role === 'admin' && (
              <Link 
                href="/admin" 
                className={`navbar__link ${pathname.startsWith('/admin') ? 'active' : ''}`}
              >
                Admin Panel
              </Link>
            )}
            {user ? (
              <>
                <Link 
                  href="/profile" 
                  className={`navbar__link ${pathname === '/profile' ? 'active' : ''}`}
                >
                  Profile
                </Link>
                <button onClick={handleLogout} className="button button--outline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="button button--outline">
                  Login
                </Link>
                <Link href="/register" className="button">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 