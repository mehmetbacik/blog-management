import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarLogoProps {
  onClose: () => void;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({ onClose }) => (
  <div className="navbar__logo">
    <Link href="/" onClick={onClose}>
      <Image
        src="/img/logo.png"
        alt="Blog Management Logo"
        width={150}
        height={50}
      />
    </Link>
  </div>
);

export default NavbarLogo;
