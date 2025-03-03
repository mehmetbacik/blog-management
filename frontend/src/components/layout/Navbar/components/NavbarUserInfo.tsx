import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface NavbarUserInfoProps {
    user: { username: string | null; role: string } | null;
}

const NavbarUserInfo: React.FC<NavbarUserInfoProps> = ({ user }) => {
  return (
    <div className="user-info">
      {user ? (
        <div className="user-info__content">
          <FaUserCircle className="user-info__icon" />
          <span className="user-info__username">{user.username ? user.username : "User"} - {user.role}</span>
        </div>
      ) : (
        <div className="user-info__content">
          <FaUserCircle className="user-info__icon" />
          <span className="user-info__guest">Guest! Please Log in.</span>
        </div>
      )}
    </div>
  );
};

export default NavbarUserInfo;
