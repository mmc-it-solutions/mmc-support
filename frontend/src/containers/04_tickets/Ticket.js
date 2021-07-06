import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {
  getTickets,
  createTicket,
  updateTicketStatus,
} from "../../store/actions/ticket";
import { getCustomer, getCustomers } from "../../store/actions/customer";

import Header from "../../components/Layout/List/Header/Header"; /* voorbeeld reusable component*/
import List from "../../components/Layout/List/List/List";
import AddTicketPopup from "../../components/addTicketPopup/AddTicketPopup";

import "./Ticket.css";

class Ticket extends React.Component {
  state = {
    modal: {
      display: "none",
      title: "",
      description: "",
      customer: 0,
      product: 0,
    },
  };

  componentDidMount() {
    this.props.getTickets();
    this.props.getCustomers();
  }

  changeValue = (event) => {
    const { target } = event;
    const { modal } = this.state;

    let productNumber = modal.product;

    if (target.name === "customer") {
      productNumber = 0;
    } else if (target.name === "product") {
      productNumber = target.value;
    }

    this.setState({
      modal: {
        ...modal,
        [target.name]: target.value,
        product: productNumber,
      },
    });
  };

  onChangeCustomer = (event) => {
    this.changeValue(event);

    let data = {
      customerId: event.target.value,
    };

    this.props.getCustomer(data);
  };

  updateStatus = (id, newValue) => {
    let body = {
      ticketId: id,
      newStatus: newValue,
      list: true,
    };
    this.props.updateTicketStatus(body);
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

    let data = {
      title: modal.title,
      description: modal.description,
      customerId: modal.customer,
      productId: modal.product,
    };

    this.props.createTicket(data);

    this.setState({
      modal: {
        display: "none",
        title: "",
        description: "",
        customer: 0,
        product: 0,
      },
    });
  };

  render() {
    // Dit is nodig als er een login is
    // if (!this.props.authantication) {
    //   return <Redirect to={"/"} />;
    // }

    const { tickets } = this.props;

    let listColumnNames = [
      "Id",
      "Title",
      "Customer",
      "Product",
      "Employee",
      "Status",
      "Actions",
    ];

    let listColumnValues = [];
    for (let i = 0; i < tickets.length; i++) {
      listColumnValues[i] = [
        tickets[i].id,
        tickets[i].name,
        tickets[i].company,
        tickets[i].product,
        tickets[i].employee,
        tickets[i].status,
        null,
      ];
    }

    let btnActions = { Status: this.updateStatus };

    return (
      <React.Fragment>
        <AddTicketPopup
          customers={this.props.customers}
          customer={this.props.customer}
          modal={this.state.modal}
          onClose={this.changeDisplay}
          onChange={this.changeValue}
          onChangeCustomer={this.onChangeCustomer}
          submitHandler={this.submitHandler}
        />
        <Header
          title={"Tickets"}
          btnText={"Add new ticket"}
          btnAction={this.changeDisplay}
        />
        <List
          extraClass={"ticket"}
          listColumnsNames={listColumnNames}
          listColumnsValues={listColumnValues}
          btnActions={btnActions}
        />
      </React.Fragment>
    );
  }
}

const mapStateProps = (state, ownProps) => ({
  authantication: state.user.authantication,
  tickets: state.ticket.tickets,
  customers: state.customer.customers,
  customer: state.customer.customer,
});

const mapDispatchToProps = {
  getTickets,
  createTicket,
  updateTicketStatus,
  getCustomer,
  getCustomers,
};

export default connect(mapStateProps, mapDispatchToProps)(Ticket);
