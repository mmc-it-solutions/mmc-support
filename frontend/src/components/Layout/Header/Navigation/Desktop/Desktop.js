import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const DesktopNavigation = () => {
  return (
    <ul className="desktop-menu">
      <li className="desktop-menu-item">
        <NavLink to="/tickets" className="nav-link">
          Tickets
        </NavLink>
      </li>
      <li className="desktop-menu-item">
        <NavLink to="/customers" className="nav-link">
          Customers
        </NavLink>
      </li>
      <li className="desktop-menu-item">
        <NavLink to="/employees" className="nav-link">
          Employees
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopNavigation);
