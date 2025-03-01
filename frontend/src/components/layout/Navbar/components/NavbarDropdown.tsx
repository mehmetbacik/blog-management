import React from "react";
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
}) => (
  <div
    className={`navbar__dropdown ${isDropdownOpen ? "active" : ""}`}
    onClick={() => setDropdownOpen(!isDropdownOpen)}
  >
    <div className="navbar__username">
      <span className="navbar__icon">
        <FaUser />
      </span>
      <span>{user.username}</span>
    </div>
    {isDropdownOpen && (
      <div className={`navbar__dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
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

export default NavbarDropdown;
