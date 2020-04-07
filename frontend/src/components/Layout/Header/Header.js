import React from "react";

import Navigation from "./Navigation/Navigation";

import "./Header.css";

const Header = () => {
  return (
    <React.Fragment>
      <header>
        <div className="logo-container">Product Support</div>
      </header>
      <Navigation />
    </React.Fragment>
  );
};

export default Header;
