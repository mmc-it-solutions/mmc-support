import React from "react";
import "./TicketDetail.css";

import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { getTicket } from "../../../store/actions/ticket";

class TicketDetail extends React.Component {
  componentDidMount() {
    let data = {
      ticketId: this.props.match.params.id
    };

    this.props.getTicket(data);
  }

  render() {
    const { ticket } = this.props;
    if (!Array.isArray(ticket)) {
      console.log(ticket);
      return (
        <div className="ticketzien">
          <h2> {ticket.title} </h2>
          <div className="grid">
            <div className="description">
              <h3> Desription </h3>
              <p className="description-tekst"> {ticket.description} </p>
            </div>
            <div className="info">
              <p> Status:</p>
              <p> {ticket.status} </p>
              <p> Work time:</p>
              <p> {ticket.worktime} </p>
              <p> Date created:</p>
              <p> {ticket.date_created} </p>
            </div>
            <div className="extra-info">
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
  ticket: state.ticket.ticket
});

const mapDispatchToProps = { getTicket };

export default connect(mapStateProps, mapDispatchToProps)(TicketDetail);
