import React from "react";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation/Navigation";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="logo-container"> </div> <Navigation />
    </header>
  );
};

export default Header;
