import React from "react";
import "./Ticket.css";

import { NavLink } from "react-router-dom";

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
    return (
      <div>
        <AddTicketPopup
          customers={this.props.customers}
          customer={this.props.customer}
          modal={this.state.modal}
          onClose={this.changeDisplay}
          onChange={this.changeValue}
          onChangeCustomer={this.onChangeCustomer}
          submitHandler={this.submitHandler}
        />
        <div className="Ticket-List"> Ticket List </div>
        <div className="popup-button-div">
          <button className="popup-button" onClick={this.changeDisplay}>
            Popup
          </button>
        </div>
        <div>
          <table className="ticket-table">
            <thead>
              <tr>
                <th> Id </th>
                <th> Name </th>
                <th> Company </th>
                <th> Employee </th>
                <th> Status </th>
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {this.props.tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td> {ticket.id} </td>
                  <td> {ticket.name} </td>
                  <td> {ticket.company} </td>
                  <td> {ticket.employee} </td>
                  <td className={"status_" + ticket.status}>
                    {this.getStatus(ticket.status)}
                  </td>
                  <td className="FA">
                    <NavLink to={"/tickets/" + ticket.id}>
                      <FontAwesomeIcon icon={faEye} />
                    </NavLink>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateProps = (state, ownProps) => ({
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
