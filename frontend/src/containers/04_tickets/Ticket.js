import React from "react";
import "./Ticket.css";

import { NavLink, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import AddTicketPopup from "../../components/addTicketPopup/AddTicketPopup";

import { connect } from "react-redux";
import { getTickets, createTicket } from "../../store/actions/ticket";
import { getCustomer, getCustomers } from "../../store/actions/customer";

class Ticket extends React.Component {
  state = {
    modal: {
      display: "none",
      title: "",
      description: "",
      customer: 0,
      product: 0
    }
  };

  componentDidMount() {
    this.props.getTickets();
    this.props.getCustomers();
  }

  getStatus = status => {
    switch (status) {
      case 1:
        return "To do";

      case 2:
        return "Doing";

      case 3:
        return "Done";

      default:
        return "Unknown";
    }
  };

  changeValue = event => {
    const { target } = event;
    const { modal } = this.state;

    this.setState({
      modal: {
        ...modal,
        [target.name]: target.value
      }
    });
  };

  onChangeCustomer = event => {
    this.changeValue(event);

    let data = {
      customerId: event.target.value
    };

    this.props.getCustomer(data);
  };

  changeDisplay = () => {
    const { modal } = this.state;

    this.setState({
      modal: {
        ...modal,
        display: modal.display === "none" ? "flex" : "none"
      }
    });
  };

  submitHandler = event => {
    event.preventDefault();

    const { modal } = this.state;

    let data = {
      title: modal.title,
      description: modal.description,
      customerId: modal.customer,
      productId: modal.product
    };

    this.props.createTicket(data);

    this.setState({
      modal: {
        display: "none",
        title: "",
        description: "",
        customer: 0,
        product: 0
      }
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
          <div className="ticket-table">
            <div className="ticket-table-head">
              <div className="ticket-table-head-row">
                <div className="ticket-table-head-row-item"> Id </div>
                <div className="ticket-table-head-row-item"> Title </div>
                <div className="ticket-table-head-row-item"> Customer </div>
                <div className="ticket-table-head-row-item"> Product </div>
                <div className="ticket-table-head-row-item"> Employee </div>
                <div className="ticket-table-head-row-item"> Status </div>
                <div className="ticket-table-head-row-item"> Actions </div>
              </div>
            </div>
            <div className="ticket-table-body">
              {this.props.tickets.map(ticket => (
                <div key={ticket.id} className="ticket-table-body-row">
                  <div className="ticket-table-body-row-item">{ticket.id}</div>
                  <div className="ticket-table-body-row-item">
                    {ticket.name}
                  </div>
                  <div className="ticket-table-body-row-item">
                    {ticket.company}
                  </div>
                  <div className="ticket-table-body-row-item">
                    {ticket.product}
                  </div>
                  <div className="ticket-table-body-row-item">
                    {ticket.employee}
                  </div>
                  <div className="ticket-table-body-row-item">
                    {this.getStatus(ticket.status)}
                  </div>
                  <div className="ticket-table-body-row-item FA">
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
  customer: state.customer.customer
});

const mapDispatchToProps = {
  getTickets,
  createTicket,
  getCustomer,
  getCustomers
};

export default connect(mapStateProps, mapDispatchToProps)(Ticket);
