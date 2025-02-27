import React from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface NavbarMobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (state: boolean) => void;
  user: { role: string } | null;
  onLogout: () => void;
}

const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({
  menuOpen,
  setMenuOpen,
  user,
  onLogout,
}) => (
  <div className={`navbar__mobile-menu ${menuOpen ? "open" : ""}`}>
    <div className="navbar__close" onClick={() => setMenuOpen(false)}>
      <FaTimes />
    </div>
    <Link href="/" className="navbar__link">
      Home
    </Link>
    <Link href="/about" className="navbar__link">
      About
    </Link>
    {user?.role === "admin" && (
      <button onClick={() => window.open("/admin", "_blank")}>
        Admin Panel ↗
      </button>
    )}
    {user ? (
      <button onClick={onLogout}>Logout</button>
    ) : (
      <Link href="/login">Login</Link>
    )}
  </div>
);

export default NavbarMobileMenu;
