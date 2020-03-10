import React from "react";
import "./Ticket.css";

class Ticket extends React.Component {
  state = {
    tickets: [
      {
        id: 1,
        name: " test",
        company: " test",
        werker: " test",
        status: 1
      },
      {
        id: 2,
        name: " test",
        company: " test",
        werker: " test",
        status: 2
      },
      {
        id: 3,
        name: " test",
        company: " test",
        werker: " test",
        status: 3
      }
    ]
  };

  getStatus = status => {
    switch (status) {
      case 1:
        return "To do";
        break;

      case 2:
        return "Doing";
        break;

      case 3:
        return "Done";
        break;

      default:
        return "Unknow";
    }
  };

  render() {
    return (
      <div>
        <div className="Ticket-List"> Ticket List 2 </div>{" "}
        <div>
          <table className="ticket-table">
            <tr>
              <th> Id </th> <th> Name </th> <th> Company </th> <th> Werker </th>{" "}
              <th> status </th>{" "}
            </tr>{" "}
            <tbody>
              {" "}
              {this.state.tickets.map(ticket => (
                <tr>
                  <td> {ticket.id} </td> <td> {ticket.name} </td>{" "}
                  <td> {ticket.company} </td> <td> {ticket.werker} </td>{" "}
                  <td className={"status_" + ticket.status}>
                    {" "}
                    {this.getStatus(ticket.status)}{" "}
                  </td>{" "}
                </tr>
              ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Ticket;
