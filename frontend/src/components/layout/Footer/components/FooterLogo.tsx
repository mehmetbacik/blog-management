import React from "react";
import Image from "next/image";

export const FooterLogo: React.FC = () => {
  return (
    <div className="footer__logo">
      <Image
        src="/img/logo.png"
        alt="Blog Management Logo"
        width={113}
        height={38}
      />
    </div>
  );
};
