import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/data/navbarMenuLinks";

const NavbarLinks: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="navbar__menu">
      {menuItems.map(({ label, path }) => (
        <Link
          key={path}
          href={path}
          className={`navbar__link ${pathname === path ? "active" : ""}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
