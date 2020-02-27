import React from "react";

import AddTicketPopup from "../../components/addTicketPopup/AddTicketPopup";

class HomeScreen extends React.Component {
  state = {
    display: "none"
  };

  changeDisplay = () => {
    const { display } = this.state;

    this.setState({
      display: display === "none" ? "flex" : "none"
    });
  };

  render() {
    const { display } = this.state;

    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.changeDisplay}>Popup</button>
        <AddTicketPopup display={display} />
      </div>
    );
  }
}

export default HomeScreen;
