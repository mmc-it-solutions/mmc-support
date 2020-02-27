import React from "react";

import "./AddTicketPopup.css";

class AddTicketPopup extends React.Component {
  //  Om dit programma te laten werken moet deze code in de
  //  class gaan staan waar deze component wordt toegevoegd

  // state = {
  //   display: "none"
  // };

  // changeDisplay = () => {
  //   const { display } = this.state;
  //   this.setState({
  //     display: display === "none" ? "flex" : "none"
  //   });
  // };

  // <AddTicketPopup display={display} />

  render() {
    return (
      <div>
        <div
          style={{
            display: this.props.display
          }}
        >
          Popup
        </div>
      </div>
    );
  }
}

export default AddTicketPopup;
