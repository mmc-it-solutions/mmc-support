import React from "react";
import DesktopNavigation from "./Desktop/Desktop";
import MobileNavigation from "./Mobile/Mobile";

import "./Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <DesktopNavigation />
      <MobileNavigation />
    </nav>
  );
};

export default Navigation;
