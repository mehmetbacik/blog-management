"use client";

import React from "react";
import { TopBarDate } from "./components/TopBarDate";
import { TopBarMenu } from "./components/TopBarMenu";
import { TopBarSocial } from "./components/TopBarSocial";

export const TopBar: React.FC = () => {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar__content">
          <div className="topbar__group">
            <TopBarDate />
            <TopBarMenu />
          </div>
          <TopBarSocial />
        </div>
      </div>
    </div>
  );
};
