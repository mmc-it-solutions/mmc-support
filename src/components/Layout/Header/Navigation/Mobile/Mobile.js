import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <ul className="mobile-menu">
      <li>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigation);
