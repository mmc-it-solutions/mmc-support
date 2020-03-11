import React from "react";
import "./ticketzien.css";

class Ticketzien extends React.Component {
  // status heeft drie verschillende uitkomsten
  // uitkomsten: to do,doing,done
  // product, customer en user bij null zeg dat het er geen heeft

  state = {
    ticket: {
      title: "Ticket title",
      description: "hello world",
      status: 1,
      worktime: "10:00",
      date_created: "01-04-2002",
      product: {
        name: "product name"
      },
      customer: {
        company_name: "company name"
      },
      user: {
        user_name: "username"
      }
    }
  };

  render() {
    const { ticket } = this.state;
    return (
      <div>
        <h2>{ticket.title}</h2>
        <h3>{ticket.description}</h3>
        <h4>{ticket.status}</h4>
        <h5>{}</h5>
        <h6>{}</h6>
      </div>
    );
  }
}

export default Ticketzien;
