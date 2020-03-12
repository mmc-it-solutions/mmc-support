import React from "react";
import "./TicketDetail.css";

class TicketDetail extends React.Component {
  // status heeft drie verschillende uitkomsten
  // uitkomsten: to do,doing,done
  // product, customer en user bij null zeg dat het er geen heeft

  state = {
    ticket: {
      title: "Ticket title",
      description: "hello world",
      status: "1",
      worktime: "10:00",
      date_created: "01-04-2002",
      product: {
        product_name: "product name"
      },
      customer: {
        company_name: "company name"
      },
      user: {
        user_name: "user name"
      }
    }
  };

  render() {
    const { ticket } = this.state;
    return (
      <div className="ticketzien">
        <h2> {ticket.title} </h2>
        <div className="grid">
          <div className="description">
            <h3> Desription </h3>
            <p className="description-tekst"> {ticket.description} </p>
          </div>
          <div className="info">
            <p> Status: {ticket.status} </p>
            <p> Work time: {ticket.worktime} </p>
            <p> Date created: {ticket.date_created} </p>
          </div>
          <div className="extra-info">
            <div>
              <p> {ticket.product.product_name} </p>
            </div>
            <div>
              <p> {ticket.customer.company_name} </p>
            </div>
            <div>
              <p> {ticket.user.user_name} </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketDetail;
