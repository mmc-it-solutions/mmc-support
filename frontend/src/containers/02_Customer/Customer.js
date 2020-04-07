import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Customer.css";
import AddCustomer from "../../components/customers/AddCustomer";

import { NavLink, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { getCustomers, createCustomer } from "../../store/actions/customer";

import Header from "../../components/Layout/List/Header/Header"; /* voorbeeld reusable component*/

class Customer extends React.Component {
  state = {
    modal: {
      display: "none",
      company: "",
      name: "",
      email: "",
      phone: "",
    },
  };

  componentDidMount() {
    this.props.getCustomers();
  }

  changeValue = (event) => {
    const { target } = event;
    const { modal } = this.state;

    this.setState({
      modal: {
        ...modal,
        [target.name]: target.value,
      },
    });
  };

  changeDisplay = () => {
    const { modal } = this.state;

    this.setState({
      modal: {
        ...modal,
        display: modal.display === "none" ? "flex" : "none",
      },
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { modal } = this.state;

    let form = {
      name: modal.name,
      company_name: modal.company,
      email: modal.email,
      phone_number: modal.phone,
    };

    this.props.createCustomer(form);

    this.setState({
      modal: {
        display: "none",
        company: "",
        name: "",
        email: "",
        phone: "",
      },
    });
  };

  renderTableData() {
    return this.props.customers.map((customers) => {
      const { id, name, email, products } = customers;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{email}</td>
          <td>{products}</td>
          <td className="FA">
            <NavLink to={"/customers/" + id}>
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
    // Dit is nodig als er een login is
    // if (!this.props.authantication) {
    //   return <Redirect to={"/"} />;
    // }

    return (
      <React.Fragment>
        <AddCustomer
          modal={this.state.modal}
          onClose={this.changeDisplay}
          onChange={this.changeValue}
          submitHandler={this.submitHandler}
        />
        <Header
          title={"Customers"}
          btnText={"Add new customer"}
          btnAction={this.changeDisplay}
        />

        <table id="customers">
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {this.state.modalOpen ? <AddCustomer /> : null}
      </React.Fragment>
    );
  }
}

const mapStateProps = (state, ownProps) => ({
  authantication: state.user.authantication,
  customers: state.customer.customers,
});

const mapDispatchToProps = { getCustomers, createCustomer };

export default connect(mapStateProps, mapDispatchToProps)(Customer);
