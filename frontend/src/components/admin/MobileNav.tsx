'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const MobileNav = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="admin-mobile-nav">
      <Link
        href="/admin"
        className={`admin-mobile-nav__link ${isActive('/admin') ? 'admin-mobile-nav__link--active' : ''}`}
      >
        <span>Dashboard</span>
      </Link>
      <Link
        href="/admin/posts"
        className={`admin-mobile-nav__link ${isActive('/admin/posts') ? 'admin-mobile-nav__link--active' : ''}`}
      >
        <span>Posts</span>
      </Link>
      <Link
        href="/admin/users"
        className={`admin-mobile-nav__link ${isActive('/admin/users') ? 'admin-mobile-nav__link--active' : ''}`}
      >
        <span>Users</span>
      </Link>
    </nav>
  );
}; 