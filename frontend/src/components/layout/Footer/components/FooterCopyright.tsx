import React from "react";

export const FooterCopyright: React.FC = () => {
  return (
    <div className="footer__copyright">
      <p>© {new Date().getFullYear()} All Rights Reserved.</p>
      <p>
        Designed & Developed by <strong>MBCK</strong>
      </p>
    </div>
  );
};
