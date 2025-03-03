import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface NavbarUserInfoProps {
    user: { username: string | null; role: string } | null;
}

const NavbarUserInfo: React.FC<NavbarUserInfoProps> = ({ user }) => {
  return (
    <div className="navbar__user-info">
      {user ? (
        <div className="navbar__user-info__content">
          <FaUserCircle className="navbar__user-info__icon" />
          <span className="navbar__user-info__username">{user.role} - {user.username ? user.username : "User"}</span>
        </div>
      ) : (
        <div className="navbar__user-info__content">
          <FaUserCircle className="navbar__user-info__icon" />
          <span className="navbar__user-info__guest">Guest! Please Log in.</span>
        </div>
      )}
    </div>
  );
};

export default NavbarUserInfo;
