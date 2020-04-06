import React from "react";
import "./Ticket.css";
import "../../components/Layout/List/List.css";

import { NavLink, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import AddTicketPopup from "../../components/addTicketPopup/AddTicketPopup";

import { connect } from "react-redux";
import {
  getTickets,
  createTicket,
  updateTicketStatus,
} from "../../store/actions/ticket";
import { getCustomer, getCustomers } from "../../store/actions/customer";

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

    return (
      <div className="ticket">
        <AddTicketPopup
          customers={this.props.customers}
          customer={this.props.customer}
          modal={this.state.modal}
          onClose={this.changeDisplay}
          onChange={this.changeValue}
          onChangeCustomer={this.onChangeCustomer}
          submitHandler={this.submitHandler}
        />
        <div className="ticket-head">
          <h2 className="ticket-head-title"> Tickets </h2>
          <div className="ticket-head-add-ticket">
            <button
              className="ticket-head-add-ticket-button"
              onClick={this.changeDisplay}
            >
              Add new ticket
            </button>
          </div>
          <div className="ticket-head-search">
            <input
              type="text"
              className="ticket-head-search-input"
              placeholder="Search..."
            />
          </div>
        </div>
        <div>
          <div className="list">
            <div className="list-head">
              <div className="list-head-row">
                <div className="list-head-row-item"> Id </div>
                <div className="list-head-row-item"> Title </div>
                <div className="list-head-row-item"> Customer </div>
                <div className="list-head-row-item"> Product </div>
                <div className="list-head-row-item"> Employee </div>
                <div className="list-head-row-item"> Status </div>
                <div className="list-head-row-item"> Actions </div>
              </div>
            </div>
            <div className="list-body">
              {this.props.tickets.map((ticket) => (
                <div key={ticket.id} className="list-body-row">
                  <div className="list-body-row-item">{ticket.id}</div>
                  <div className="list-body-row-item">{ticket.name}</div>
                  <div className="list-body-row-item">{ticket.company}</div>
                  <div className="list-body-row-item">{ticket.product}</div>
                  <div className="list-body-row-item">{ticket.employee}</div>
                  <div className="list-body-row-item">
                    <select
                      className="list-body-row-select"
                      value={ticket.status}
                      onChange={(event) => {
                        this.updateStatus(ticket.id, event.target.value);
                      }}
                    >
                      <option value={1}>To do</option>
                      <option value={2}>Doing</option>
                      <option value={3}>Done</option>
                    </select>
                  </div>
                  <div className="list-body-row-item FA">
                    <NavLink to={"/tickets/" + ticket.id}>
                      <FontAwesomeIcon icon={faEye} />
                    </NavLink>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
