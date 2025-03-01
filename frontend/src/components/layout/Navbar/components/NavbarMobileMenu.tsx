import React from "react";
import Link from "next/link";
import { FaTimes, FaSearch } from "react-icons/fa";

interface NavbarMobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (state: boolean) => void;
  user: { role: string } | null;
  onLogout: () => void;
  onAdminPanel: () => void;
  pathname: string;
}

const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({
  menuOpen,
  setMenuOpen,
  user,
  onLogout,
  onAdminPanel,
  pathname,
}) => {
  const closeMenu = () => setMenuOpen(false);

  const handleButtonClick = (action: () => void) => {
    action();
    closeMenu();
  };

  return (
    <div className={`navbar__mobile-menu ${menuOpen ? "open" : ""}`}>
      <div className="navbar__close" onClick={closeMenu}>
        <FaTimes />
      </div>
      <Link
        href="/"
        className={`navbar__link ${pathname === "/" ? "active" : ""}`}
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link
        href="/posts"
        className={`navbar__link ${pathname === "/posts" ? "active" : ""}`}
        onClick={closeMenu}
      >
        Blog
      </Link>
      <Link
        href="/about"
        className={`navbar__link ${pathname === "/about" ? "active" : ""}`}
        onClick={closeMenu}
      >
        About
      </Link>
      <Link
        href="/contact"
        className={`navbar__link ${pathname === "/contact" ? "active" : ""}`}
        onClick={closeMenu}
      >
        Contact
      </Link>
      <Link
        href="/search"
        className={`navbar__link ${pathname === "/search" ? "active" : ""}`}
        onClick={closeMenu}
      >
        <FaSearch />
      </Link>
      {user && user.role === "admin" && (
        <button
          onClick={() => handleButtonClick(onAdminPanel)}
          className="navbar__link navbar__button--mobile"
        >
          Admin Panel ↗
        </button>
      )}
      {user ? (
        <>
          <Link
            href="/profile"
            className={`navbar__link navbar__button--mobile ${
              pathname === "/profile" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Profile
          </Link>
          <button
            onClick={() => handleButtonClick(onLogout)}
            className="navbar__link navbar__button--mobile"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="navbar__link navbar__button--mobile"
            onClick={closeMenu}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="navbar__link navbar__button--mobile"
            onClick={closeMenu}
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarMobileMenu;
