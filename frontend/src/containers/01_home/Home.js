import React from "react";

import { connect } from "react-redux";
import { getTickets, updateTicketStatus } from "../../store/actions/ticket";

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.getTickets();
  }

  changeState = (id, event) => {
    let data = {
      id: id,
      newStatus: event.target.value
    };

    this.props.updateTicketStatus(data);
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        {this.props.tickets.map(ticket => (
          <p>
            {ticket.id} {ticket.name}:
            <select
              value={ticket.status}
              onChange={this.changeState.bind(this, ticket.id)}
            >
              <option value="1">To do</option>
              <option value="2">Doing</option>
              <option value="3">Done</option>
            </select>
          </p>
        ))}
      </div>
    );
  }
}

const mapStateProps = (state, ownProps) => ({
  tickets: state.ticket.tickets
});

const mapDispatchToProps = { getTickets, updateTicketStatus };

export default connect(mapStateProps, mapDispatchToProps)(HomeScreen);
