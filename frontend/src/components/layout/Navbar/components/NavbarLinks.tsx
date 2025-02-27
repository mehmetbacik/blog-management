import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks: React.FC = () => {
  const pathname = usePathname();

  return (
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
  );
};

export default NavbarLinks;
