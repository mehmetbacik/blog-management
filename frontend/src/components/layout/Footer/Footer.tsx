"use client";

import React from "react";
import { FooterNewsletter } from "./components/FooterNewsletter";
import { FooterLogo } from "./components/FooterLogo";
import { FooterAppLinks } from "./components/FooterAppLinks";
import { FooterMenu } from "./components/FooterMenu";
import { FooterSocial } from "./components/FooterSocial";
import { FooterCopyright } from "./components/FooterCopyright";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <FooterNewsletter />
          <FooterLogo />
          <FooterAppLinks />
          <FooterMenu />
          <FooterSocial />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};
