import React from "react";

import "./AddTicketPopup.css";

const AddTicketPopup = ({ modal, onClose, onChange, addTicket }) => {
  //  Om dit programma te laten werken moet deze code in de
  //  class gaan staan waar deze component wordt toegevoegd.

  // state = {
  //   modal: {
  //     display: "flex",
  //     title: "",
  //     description: "",
  //     customer: 0,
  //     product: 0
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

  // addTicket = event => {
  //   event.preventDefault();

  //   const { modal } = this.state;

  //   let data = {
  //     title: modal.title,
  //     description: modal.description,
  //     customerId: modal.customer,
  //     productId: modal.product
  //   };

  //   let json = {
  //     action: "insertTicket",
  //     data: data
  //   };

  //   let config = {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json, application/x-www-form-urlencoded"
  //     }
  //   };

  //   axios
  //     .post("http://localhost/mmcSupport/backend/", json, config)
  //     .then(resp => {
  //       this.setState({
  //         modal: {
  //           ...modal,
  //           display: "none",
  //           title: "",
  //           description: "",
  //           customer: "0",
  //           product: "0",
  //           disabled: true
  //         }
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // Dit is de html code die in de render functie moet zitten

  // <button onClick={this.changeDisplay}>Popup</button>
  // <AddTicketPopup
  //   modal={this.state.modal}
  //   onClose={this.changeDisplay}
  //   onChange={this.changeValue}
  //   addTicket={this.addTicket}
  // />

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
            <option value="0">none</option>
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
            <option value="0">none</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <br />
          <input
            className="modal__form--submit"
            type="submit"
            value="Add Ticket"
            onClick={addTicket}
          />
        </form>
        <input
          className="modal__form--close"
          type="button"
          value="X"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default AddTicketPopup;
