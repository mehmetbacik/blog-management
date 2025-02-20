"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

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
              <Link
                href="/contact"
                className={`topbar__link ${
                  pathname === "/contact" ? "active" : ""
                }`}
              >
                Contact
              </Link>
              <Link href="/login" className="topbar__link">
                Login
              </Link>
              <Link href="/register" className="topbar__link">
                Register
              </Link>
            </div>
          </div>
          <div className="topbar__social">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
