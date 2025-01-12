import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__content">
          <Link href="/" className="navbar__brand">
            Blog Management
          </Link>

          <div className="navbar__menu">
            {user ? (
              <>
                <Link href="/dashboard" className="navbar__link">
                  Dashboard
                </Link>
                <Link href="/posts/new" className="navbar__link">
                  New Post
                </Link>
                <button 
                  onClick={logout} 
                  className="button button--outline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="navbar__link">
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