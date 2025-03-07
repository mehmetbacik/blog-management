"use client";

import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

import Image from "next/image";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Newsletter Subscription */}
          <div className="footer__newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          {/* Logo */}
          <div className="footer__logo">
            <Image
              src="/img/logo.png"
              alt="Blog Management Logo"
              width={150}
              height={50}
            />
          </div>

          {/* Footer Menu */}
          <div className="footer__menu">
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/cookies">Cookies Policy</a>
              </li>
              <li>
                <a href="/terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/help">Help Center</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer__social">
            <h3>Follow Us</h3>
            <div>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Signature */}
        <div className="footer__copyright">
          <p>© {new Date().getFullYear()} All Rights Reserved.</p>
          <p>
            Designed & Developed by <strong>MBCK</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};
