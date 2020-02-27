import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const DesktopNavigation = () => {
  return (
    <ul className="desktop-menu">
      <li>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/customers" className="nav-link">
          Customers
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopNavigation);
