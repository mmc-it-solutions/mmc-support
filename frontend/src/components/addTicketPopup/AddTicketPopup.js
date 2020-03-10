import React from "react";

import "./AddTicketPopup.css";

const AddTicketPopup = ({ modal, onClose, onChange }) => {
  //  Om dit programma te laten werken moet deze code in de
  //  class gaan staan waar deze component wordt toegevoegd.

  // state = {
  //   modal: {
  //     display: "flex",
  //     title: "",
  //     description: "",
  //     customer: 1,
  //     product: 1
  //   }
  // };

  // changeValue = event => {
  //   const { target } = event;
  //   const { modal } = this.state;

  //   this.setState({
  //     modal: {
  //       ...modal,
  //       [target.name]: target.value
  //     }
  //   });
  // };

  // changeDisplay = () => {
  //   const { modal } = this.state;

  //   this.setState({
  //     modal: {
  //       ...modal,
  //       display: modal.display === "none" ? "flex" : "none"
  //     }
  //   });
  // };

  // Dit is de html code die in de render functie moet zitten

  // <button onClick={this.changeDisplay}>Popup</button>
  //       <AddTicketPopup
  //         modal={modal}
  //         onClose={this.changeDisplay}
  //         onChange={this.changeValue}
  //       />

  return (
    <div className="modal-wrap" style={{ display: modal.display }}>
      <div className="achtergrond" onClick={onClose} />
      <div className="modal">
        <h2 className="modal__titel">Add ticket</h2>
        <form className="modal__form">
          <label className="modal__form--label">Title</label>
          <br />
          <input
            className="modal__form--input"
            type="text"
            name="title"
            value={modal.title}
            onChange={onChange}
          />
          <br />
          <label className="modal__form--label">Description</label>
          <br />
          <textarea
            className="modal__form--textarea"
            name="description"
            value={modal.description}
            onChange={onChange}
          />
          <br />
          <label className="modal__form--label">Customer</label>
          <br />
          <select
            className="modal__form--select"
            name="customer"
            value={modal.customer}
            onChange={onChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <br />
          <label className="modal__form--label">Product</label>
          <br />
          <select
            className="modal__form--select"
            name="product"
            value={modal.product}
            onChange={onChange}
          >
            <option value="3">3</option>
            <option value="6">6</option>
          </select>
          <br />
          <input
            className="modal__form--submit"
            type="submit"
            value="Add Ticket"
          />
        </form>
        <input
          className="modal__form--kruisje"
          type="button"
          value="X"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default AddTicketPopup;
