import React from "react";
import { socialMediaLinks } from "@/data/socialMedia";

export const FooterSocial: React.FC = () => {
  return (
    <div className="footer__social">
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
  );
};
