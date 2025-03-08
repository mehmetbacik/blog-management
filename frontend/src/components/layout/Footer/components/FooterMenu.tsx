import React from "react";
import { footerMenuLinks } from "@/data/footerMenuLinks";

export const FooterMenu: React.FC = () => {
  return (
    <div className="footer__menu">
      <ul>
        {footerMenuLinks.map((item, index) => (
          <li key={index}>
            <a href={item.path}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
