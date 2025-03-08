import React from "react";
import Image from "next/image";

export const FooterAppLinks: React.FC = () => {
  return (
    <div className="footer__app-links">
      <a href="https://www.apple.com/app-store/">
        <Image
          src="/img/appstore.svg"
          alt="Download on the App Store"
          width={135}
          height={40}
        />
      </a>
      <a href="https://play.google.com/store">
        <Image
          src="/img/googleplay.svg"
          alt="Get it on Google Play"
          width={135}
          height={40}
        />
      </a>
    </div>
  );
};
