"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, refreshUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    refreshUser();
  }, [pathname, refreshUser]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleAdminPanel = () => {
    window.open("/admin", "_blank", "noopener,noreferrer");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleButtonClick = (action: () => void) => {
    action();
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__content">
          {/* Logo Section */}
          <div className="navbar__logo">
            <Link href="/" onClick={closeMenu}>
              <Image
                src="/img/logo.png"
                alt="Blog Management Logo"
                width={150}
                height={50}
              />
            </Link>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="navbar__hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Menu Links Section (Desktop) */}
          <div className="navbar__menu">
            <Link
              href="/"
              className={`navbar__link ${pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`navbar__link ${
                pathname === "/about" ? "active" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`navbar__link ${
                pathname === "/contact" ? "active" : ""
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Buttons (Search, Profile, Login/Logout) */}
          <div className="navbar__buttons">
            <Link
              href="/search"
              className={`navbar__link ${
                pathname === "/search" ? "active" : ""
              }`}
            >
              <FaSearch />
            </Link>
            {user && user.role === "admin" && (
              <button
                onClick={handleAdminPanel}
                className="navbar__link admin-button"
              >
                Admin Panel ↗
              </button>
            )}
            {user ? (
              <>
                <Link
                  href="/profile"
                  className={`navbar__link ${
                    pathname === "/profile" ? "active" : ""
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="button button--outline"
                >
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

      {/* Overlay for Mobile Menu */}
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="navbar__close" onClick={closeMenu}>
          <FaTimes />
        </div>
        <Link
          href="/"
          className={`navbar__link ${pathname === "/" ? "active" : ""}`}
          onClick={() => handleButtonClick(closeMenu)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`navbar__link ${pathname === "/about" ? "active" : ""}`}
          onClick={() => handleButtonClick(closeMenu)}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`navbar__link ${pathname === "/contact" ? "active" : ""}`}
          onClick={() => handleButtonClick(closeMenu)}
        >
          Contact
        </Link>
        <Link
          href="/search"
          className={`navbar__link ${pathname === "/search" ? "active" : ""}`}
          onClick={() => handleButtonClick(closeMenu)}
        >
          <FaSearch />
        </Link>
        {user && user.role === "admin" && (
          <button
            onClick={() => handleButtonClick(handleAdminPanel)}
            className="navbar__link admin-button"
          >
            Admin Panel ↗
          </button>
        )}
        {user ? (
          <>
            <Link
              href="/profile"
              className={`navbar__link ${
                pathname === "/profile" ? "active" : ""
              }`}
              onClick={() => handleButtonClick(closeMenu)}
            >
              Profile
            </Link>
            <button
              onClick={() => handleButtonClick(handleLogout)}
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
              onClick={() => handleButtonClick(closeMenu)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="navbar__link navbar__button--mobile"
              onClick={() => handleButtonClick(closeMenu)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
