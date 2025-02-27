import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaUser } from "react-icons/fa";
import NavbarDropdown from "./NavbarDropdown";

interface NavbarButtonsProps {
  user: { username: string; role: string } | null;
  onLogout: () => void;
}

const NavbarButtons: React.FC<NavbarButtonsProps> = ({ user, onLogout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar__buttons">
      <Link href="/search" className="navbar__button">
        <FaSearch />
        <span>Search</span>
      </Link>
      {user ? (
        <NavbarDropdown
          user={user}
          isDropdownOpen={isDropdownOpen}
          setDropdownOpen={setDropdownOpen}
          onLogout={onLogout}
        />
      ) : (
        <Link href="/login" className="navbar__button">
          <FaUser />
          <span>Login</span>
        </Link>
      )}
    </div>
  );
};

export default NavbarButtons;
