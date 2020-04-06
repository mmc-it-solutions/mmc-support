import React from "react";

import Navigation from "./Navigation/Navigation";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="logo-container">Product Support</div> <Navigation />
    </header>
  );
};

export default Header;
