import React from "react";
import "./TicketDetail.css";

import ChangeCompanyPopUp from "../../../components/changeCompanyPopUp/ChangeCompanyPopUp";

import { NavLink, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import {
  getTicket,
  updateCustomerOfTicket
} from "../../../store/actions/ticket";
import { getCustomers } from "../../../store/actions/customer";

class TicketDetail extends React.Component {
  state = {
    companyModal: {
      display: "none"
    }
  };

  componentDidMount() {
    let data = {
      ticketId: this.props.match.params.id
    };

    this.props.getTicket(data);
    this.props.getCustomers();
  }

  getStatus = status => {
    switch (status) {
      case 1:
        return "To Do";

      case 2:
        return "Doing";

      case 3:
        return "Done";
    }
  };

  modalDisplayChange = modal => {
    const { companyModal } = this.state;

    switch (modal) {
      case "product":
        break;

      case "company":
        this.setState({
          companyModal: {
            display: companyModal.display === "none" ? "flex" : "none"
          }
        });
        break;

      case "user":
        break;

      default:
        console.log("There is an error");
    }
  };

  submitHandler = (modal, newId, event) => {
    event.preventDefault();

    switch (modal) {
      case "product":
        break;

      case "company":
        let data = {
          ticketId: this.props.match.params.id,
          customerId: newId
        };
        this.props.updateCustomerOfTicket(data);
        break;

      case "user":
        break;

      default:
        console.log("There is an error");
    }

    this.setState({
      companyModal: {
        display: "none"
      }
    });
  };

  render() {
    const { ticket } = this.props;

    // Dit is nodig als er een login is
    // if (!this.props.authantication) {
    //   return <Redirect to={"/"} />;
    // }

    if (!Array.isArray(ticket)) {
      return (
        <div className="ticketzien">
          <ChangeCompanyPopUp
            modal={this.state.companyModal}
            onClose={this.modalDisplayChange.bind(this, "company")}
            submitHandler={this.submitHandler}
            customerId={this.props.ticket.customer.id}
            customers={this.props.customers}
          />
          <h2> {ticket.title} </h2>
          <div className="grid">
            <div className="description">
              <h3> Desription </h3>
              <p className="description-tekst"> {ticket.description} </p>
            </div>
            <div className="info">
              <p> Status:</p>
              <p> {this.getStatus(ticket.status)} </p>
              <p> Work time:</p>
              <p> {ticket.worktime} </p>
              <p> Date created:</p>
              <p> {ticket.date_created} </p>
            </div>
            <div className="extra-info">
              <div className="extra-info-button">
                <button>Change Product</button>
              </div>
              <div className="extra-info-button">
                <button onClick={this.modalDisplayChange.bind(this, "company")}>
                  Change Company
                </button>
              </div>
              <div className="extra-info-button">
                <button>Change User</button>
              </div>
              <div>
                <h3>Product</h3>
                <p> {ticket.product.product_name} </p>
              </div>
              <div className="extra-info-customer">
                {ticket.customer.id == 0 ? (
                  <React.Fragment>
                    <h3>Company</h3>
                    <p> {ticket.customer.company_name} </p>
                  </React.Fragment>
                ) : (
                  <NavLink to={"/customers/" + ticket.customer.id}>
                    <React.Fragment>
                      <h3>Company</h3>
                      <p> {ticket.customer.company_name} </p>
                    </React.Fragment>
                  </NavLink>
                )}
              </div>
              <div>
                <h3>User</h3>
                <p> {ticket.user.user_name} </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return "Error 404";
  }
}

const mapStateProps = (state, ownProps) => ({
  authantication: state.user.authantication,
  ticket: state.ticket.ticket,
  customers: state.customer.customers
});

const mapDispatchToProps = { getTicket, updateCustomerOfTicket, getCustomers };

export default connect(mapStateProps, mapDispatchToProps)(TicketDetail);
