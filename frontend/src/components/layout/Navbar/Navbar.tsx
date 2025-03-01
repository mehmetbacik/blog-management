"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import NavbarLogo from "./components/NavbarLogo";
import NavbarLinks from "./components/NavbarLinks";
import NavbarButtons from "./components/NavbarButtons";
import NavbarMobileMenu from "./components/NavbarMobileMenu";
import { FaBars } from "react-icons/fa";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, refreshUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    refreshUser();
  }, [pathname, refreshUser]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleAdminPanel = () => {
    router.push("/admin");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__content">
          <NavbarLogo onClose={() => setMenuOpen(false)} />
          <div className="navbar__hamburger" onClick={toggleMenu}>
            <FaBars />
          </div>
          <NavbarLinks />
          <NavbarButtons user={user} onLogout={handleLogout} />
        </div>
      </div>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}
      <NavbarMobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        user={user}
        onLogout={handleLogout}
        onAdminPanel={handleAdminPanel}
        pathname={pathname}
      />
    </nav>
  );
};
