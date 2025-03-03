import React, { useEffect, useRef } from "react";
import { FaUser, FaSignOutAlt, FaCogs } from "react-icons/fa";
import Link from "next/link";

interface NavbarDropdownProps {
  user: { username: string; role: string };
  isDropdownOpen: boolean;
  setDropdownOpen: (state: boolean) => void;
  onLogout: () => void;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({
  user,
  isDropdownOpen,
  setDropdownOpen,
  onLogout,
}) => {
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

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, setDropdownOpen]);

  return (
    <div
      className={`navbar__dropdown ${isDropdownOpen ? "active" : ""}`}
      ref={dropdownRef}
    >
      <div
        className="navbar__username"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <span className="navbar__icon">
          <FaUser />
        </span>
        <span>{user.username}</span>
      </div>
      {isDropdownOpen && (
        <div className={`navbar__dropdown-menu open`}>
          {user.role === "admin" && (
            <div
              onClick={() => window.open("/admin", "_blank")}
              className="navbar__dropdown-item"
            >
              <span className="navbar__icon">
                <FaCogs />
              </span>
              <span>Admin Panel</span>
            </div>
          )}
          <Link href="/profile" className="navbar__dropdown-item">
            <span className="navbar__icon">
              <FaUser />
            </span>
            <span>Profile</span>
          </Link>
          <div className="navbar__dropdown-item" onClick={onLogout}>
            <span className="navbar__icon">
              <FaSignOutAlt />
            </span>
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
