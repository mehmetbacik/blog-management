"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuLinks } from "@/data/topbarMenuLinks";
import { socialMediaLinks } from "@/data/socialMedia";

export const TopBar: React.FC = () => {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar__content">
          <div className="topbar__group">
            <span className="topbar__date">{currentDate}</span>
            <div className="topbar__links">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`topbar__link ${
                    pathname === link.href ? "active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="topbar__social">
            {socialMediaLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
