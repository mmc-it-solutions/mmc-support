import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Customer.css";
import "../../components/customers/AddCustomer.js";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { getCustomers } from "../../store/actions/customer";

class Customer extends React.Component {
  componentDidMount() {
    this.props.getCustomers();
  }

  renderTableData() {
    return this.props.customers.map(customers => {
      const { id, name, email, products } = customers;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{email}</td>
          <td>{products}</td>
          <td className="FA">
            <NavLink to="#">
              <FontAwesomeIcon icon={faEye} />
            </NavLink>
            <FontAwesomeIcon icon={faTrashAlt} />
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    if (typeof this.props.customers[0] !== "undefined") {
      let header = Object.keys(this.props.customers[0]);
      return header.map((key, index) => {
        if (key.toUpperCase() !== "ID") {
          return <th key={index}>{key.toUpperCase()}</th>;
        }
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <h2 className="title">Company List</h2>

        <div className="content">
          <button>Add Company</button>

          <input type="text" placeholder=" Search" />
        </div>

        <table id="customers">
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateProps = (state, ownProps) => ({
  customers: state.customer.customers
});

const mapDispatchToProps = { getCustomers };

export default connect(mapStateProps, mapDispatchToProps)(Customer);
