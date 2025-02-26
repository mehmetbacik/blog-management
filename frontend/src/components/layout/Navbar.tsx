"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import {
  FaBars,
  FaSearch,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaCogs,
} from "react-icons/fa";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, refreshUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDropdownOpen(false);
  }, [user, pathname]);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              href="/posts"
              className={`navbar__link ${pathname === "/posts" ? "active" : ""}`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`navbar__link ${pathname === "/about" ? "active" : ""}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`navbar__link ${pathname === "/contact" ? "active" : ""}`}
            >
              Contact
            </Link>
          </div>

          {/* Buttons (Search, Profile, Login/Logout) */}
          <div className="navbar__buttons">
            <Link
              href="/search"
              className={`navbar__button ${pathname === "/search" ? "active" : ""}`}
            >
              Search
            </Link>
            {user ? (
              <div className="navbar__dropdown navbar__button" ref={dropdownRef}>
                <button className="navbar__username" onClick={toggleDropdown}>
                  <FaUser /> {user.username}
                </button>
                <div className={`navbar__dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
                  {user.role === "admin" && (
                    <button onClick={handleAdminPanel} className="navbar__button admin-button">
                      <FaCogs /> Admin Panel ↗
                    </button>
                  )}
                  <div className="navbar__dropdown-item">
                    <Link href="/profile">
                      <FaUser /> Profile
                    </Link>
                  </div>
                  <div className="navbar__dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="navbar__button">
                  Login
                </Link>
                <Link href="/register" className="navbar__button">
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
          <button onClick={() => handleButtonClick(handleAdminPanel)} className="navbar__link admin-button">
            Admin Panel ↗
          </button>
        )}
        {user ? (
          <>
            <Link
              href="/profile"
              className={`navbar__link ${pathname === "/profile" ? "active" : ""}`}
              onClick={() => handleButtonClick(closeMenu)}
            >
              Profile
            </Link>
            <button onClick={() => handleButtonClick(handleLogout)} className="navbar__link navbar__button--mobile">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="navbar__link navbar__button--mobile" onClick={() => handleButtonClick(closeMenu)}>
              Login
            </Link>
            <Link href="/register" className="navbar__link navbar__button--mobile" onClick={() => handleButtonClick(closeMenu)}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
