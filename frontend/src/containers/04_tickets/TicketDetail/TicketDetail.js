import React from "react";
import "./TicketDetail.css";

import ChangeCompanyPopUp from "../../../components/changeCompanyPopUp/ChangeCompanyPopUp";
import ChangeProductPopUp from "../../../components/changeProductPopUp/ChangeProductPopUp";
import ChangeUserPopUp from "../../../components/changeUserPopUp/ChangeUserPopUp";

import { NavLink, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import {
  getTicket,
  updateTicketStatus,
  updateCustomerOfTicket,
  updateProductOfTicket
} from "../../../store/actions/ticket";
import { getCustomer, getCustomers } from "../../../store/actions/customer";
import { getUsers } from "../../../store/actions/user";

class TicketDetail extends React.Component {
  state = {
    productModal: {
      display: "none"
    },
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
    this.props.getUsers();
  }

  changeHandler = event => {
    let data = {
      ticketId: this.props.match.params.id,
      newStatus: event.target.value
    };

    this.props.updateTicketStatus(data);
  };

  modalDisplayChange = modal => {
    const { companyModal, productModal } = this.state;

    switch (modal) {
      case "product":
        this.setState({
          productModal: {
            display: productModal.display === "none" ? "flex" : "none"
          }
        });
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
        let dataProduct = {
          ticketId: this.props.match.params.id,
          productId: newId
        };
        this.props.updateProductOfTicket(dataProduct);
        break;

      case "company":
        let dataCompany = {
          ticketId: this.props.match.params.id,
          customerId: newId
        };
        this.props.updateCustomerOfTicket(dataCompany);
        break;

      case "user":
        break;

      default:
        console.log("There is an error");
    }

    this.setState({
      companyModal: {
        display: "none"
      },
      productModal: {
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
          <ChangeProductPopUp
            modal={this.state.productModal}
            onClose={this.modalDisplayChange.bind(this, "product")}
            submitHandler={this.submitHandler}
            productId={this.props.ticket.product.id}
            customer={this.props.ticket.customer}
          />
          <h2> {ticket.title} </h2>
          <div className="grid">
            <div className="description">
              <h3> Desription </h3>
              <p className="description-tekst"> {ticket.description} </p>
            </div>
            <div className="info">
              <p> Status:</p>
              <div>
                <select value={ticket.status} onChange={this.changeHandler}>
                  <option value="1">To Do</option>
                  <option value="2">Doing</option>
                  <option value="3">Done</option>
                </select>
              </div>
              <p> Work time:</p>
              <p> {ticket.worktime} </p>
              <p> Date created:</p>
              <p> {ticket.date_created} </p>
            </div>
            <div className="extra-info">
              <div className="extra-info-button">
                <button onClick={this.modalDisplayChange.bind(this, "product")}>
                  Change Product
                </button>
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
                    <p> {ticket.customer.name} </p>
                  </React.Fragment>
                ) : (
                  <NavLink to={"/customers/" + ticket.customer.id}>
                    <React.Fragment>
                      <h3>Company</h3>
                      <p> {ticket.customer.name} </p>
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
  customer: state.customer.customer,
  customers: state.customer.customers,
  users: state.user.users
});

const mapDispatchToProps = {
  getTicket,
  updateCustomerOfTicket,
  updateProductOfTicket,
  updateTicketStatus,
  getCustomer,
  getCustomers,
  getUsers
};

export default connect(mapStateProps, mapDispatchToProps)(TicketDetail);
