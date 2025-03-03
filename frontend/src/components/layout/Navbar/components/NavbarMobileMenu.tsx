import React from "react";
import Link from "next/link";
import {
  FaTimes,
  FaSearch,
  FaCogs,
  FaUser,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { menuItems } from "@/data/navbarMenuLinks";

import NavbarLogo from "./NavbarLogo";
import NavbarUserInfo from "./NavbarUserInfo";

interface NavbarMobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (state: boolean) => void;
  user: { username: string | null; role: string } | null;
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
        <span className="navbar__icon">
          <FaTimes />
        </span>
      </div>
      <NavbarLogo onClose={() => setMenuOpen(false)} />
      <NavbarUserInfo user={user} />
      <div className="navbar__menu--list">
        {menuItems.map((items) => (
          <Link
            key={items.path}
            href={items.path}
            className={`navbar__link navbar__button--mobile ${
              pathname === items.path ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <span className="navbar__icon">
              <items.icon />
            </span>
            {items.label}
          </Link>
        ))}
        <Link
          href="/search"
          className={`navbar__link navbar__button--mobile ${
            pathname === "/search" ? "active" : ""
          }`}
          onClick={closeMenu}
        >
          <span className="navbar__icon">
            <FaSearch />
          </span>
          <span>Search</span>
        </Link>
      </div>
      <div className="navbar__submenu--list">
        {user && user.role === "admin" && (
          <button
            onClick={() => handleButtonClick(onAdminPanel)}
            className="navbar__link navbar__button--mobile"
          >
            <span className="navbar__icon">
              <FaCogs />
            </span>
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
              <span className="navbar__icon">
                <FaUser />
              </span>
            </Link>
            <button
              onClick={() => handleButtonClick(onLogout)}
              className="navbar__link navbar__button--mobile"
            >
              <span className="navbar__icon">
                <FaSignOutAlt />
              </span>
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="navbar__link navbar__button--mobile"
              onClick={closeMenu}
            >
              <span className="navbar__icon">
                <FaUser />
              </span>
            </Link>
            <Link
              href="/register"
              className="navbar__link navbar__button--mobile"
              onClick={closeMenu}
            >
              <span className="navbar__icon">
                <FaUserPlus />
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
