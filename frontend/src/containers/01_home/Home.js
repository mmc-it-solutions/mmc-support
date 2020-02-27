import React from "react";

import { AddTicketpopup } from "../../components/addTicketPopup/AddTicketPopup";

class HomeScreen extends React.Component {
  changeDisplay = () => {};
  render() {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.changeDisplay}>Popup</button>
        <addTicketPopup />
      </div>
    );
  }
}

export default HomeScreen;
