import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuLinks } from "@/data/topbarMenuLinks";

export const TopBarMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="topbar__links">
      {menuLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`topbar__link ${pathname === link.href ? "active" : ""}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
