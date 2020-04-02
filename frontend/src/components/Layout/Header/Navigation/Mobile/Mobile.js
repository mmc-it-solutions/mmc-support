import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <ul className="mobile-menu">
      <li>
        <NavLink to="/tickets" className="nav-link">
          Tickets
        </NavLink>
      </li>
      <li>
        <NavLink to="/customers" className="nav-link">
          Customers
        </NavLink>
      </li>
      <li>
        <NavLink to="/employees" className="nav-link">
          Employees
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigation);
