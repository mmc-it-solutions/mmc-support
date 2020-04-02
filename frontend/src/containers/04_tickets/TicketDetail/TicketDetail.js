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
  updateProductOfTicket,
  updateUserOfTicket
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
    },
    userModal: {
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
    const { companyModal, productModal, userModal } = this.state;

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
        this.setState({
          userModal: {
            display: userModal.display === "none" ? "flex" : "none"
          }
        });
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
        let dataUser = {
          ticketId: this.props.match.params.id,
          userId: newId
        };
        this.props.updateUserOfTicket(dataUser);
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
      },
      userModal: {
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
          <ChangeUserPopUp
            modal={this.state.userModal}
            onClose={this.modalDisplayChange.bind(this, "user")}
            submitHandler={this.submitHandler}
            userId={this.props.ticket.user.id}
            users={this.props.users}
          />
          <h2 className="ticket-detail-title"> {ticket.title} </h2>
          <div className="ticket-detail-grid">
            <div className="ticket-detail-decription">
              <h3 className="ticket-detail-decription-title"> Desription </h3>
              <p className="ticket-detail-description-text">
                {ticket.description}
              </p>
            </div>
            <div className="ticket-detail-info">
              <p className="ticket-detail-info-head-tekst"> Status:</p>
              <div>
                <select value={ticket.status} onChange={this.changeHandler}>
                  <option value="1">To Do</option>
                  <option value="2">Doing</option>
                  <option value="3">Done</option>
                </select>
              </div>
              <p className="ticket-detail-info-head-tekst"> Work time:</p>
              <p className="ticket-detail-info-tekst"> {ticket.worktime} </p>
              <p className="ticket-detail-info-head-tekst"> Date created:</p>
              <p className="ticket-detail-info-tekst">{ticket.date_created}</p>
            </div>
            <div className="ticket-detail-extra-info">
              <div className="ticket-detail-extra-info-div">
                <h3 className="ticket-detail-extra-info-div-title">Product</h3>
                <p className="ticket-detail-extra-info-div-text">
                  {ticket.product.product_name}
                </p>
              </div>
              <div className="ticket-detail-extra-info-div">
                {ticket.customer.id == 0 ? (
                  <React.Fragment>
                    <h3 className="ticket-detail-extra-info-div-title">
                      Company
                    </h3>
                    <p className="ticket-detail-extra-info-div-text">
                      {ticket.customer.name}
                    </p>
                  </React.Fragment>
                ) : (
                  <NavLink to={"/customers/" + ticket.customer.id}>
                    <React.Fragment>
                      <h3 className="ticket-detail-extra-info-div-title">
                        Company
                      </h3>
                      <p className="ticket-detail-extra-info-div-text">
                        {ticket.customer.name}
                      </p>
                    </React.Fragment>
                  </NavLink>
                )}
              </div>
              <div className="ticket-detail-extra-info-div">
                <h3 className="ticket-detail-extra-info-div-title">User</h3>
                <p className="ticket-detail-extra-info-div-text">
                  {ticket.user.user_name}
                </p>
              </div>
              <div className="ticket-detail-extra-info-button">
                <button onClick={this.modalDisplayChange.bind(this, "product")}>
                  Change Product
                </button>
              </div>
              <div className="ticket-detail-extra-info-button">
                <button onClick={this.modalDisplayChange.bind(this, "company")}>
                  Change Company
                </button>
              </div>
              <div className="ticket-detail-extra-info-button">
                <button onClick={this.modalDisplayChange.bind(this, "user")}>
                  Change User
                </button>
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
  updateUserOfTicket,
  updateTicketStatus,
  getCustomer,
  getCustomers,
  getUsers
};

export default connect(mapStateProps, mapDispatchToProps)(TicketDetail);
