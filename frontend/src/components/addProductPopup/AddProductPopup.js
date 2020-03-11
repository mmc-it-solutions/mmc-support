import React from "react";

import "./AddProductPopup.css";

const AddProductPopup = ({ modal, changeValue, changeDisplay, addProduct }) => {
  // Dit is de code die je nodig hebt in de class om deze te laten werken

  // state = {
  //     //Wordt op dit moment gebruikt voor testing.
  //     //Maar kan later misschien gebruikt worden.
  //     customerId: 1,

  //     modal: {
  //       display: "none",
  //       name: "",
  //       disabled: true
  //     }
  //   };

  //   changeValue = event => {
  //     const { target } = event;
  //     const { modal } = this.state;

  //     let newValue = modal.name === "" ? true : false;

  //     this.setState({
  //       modal: {
  //         ...modal,
  //         [target.name]: target.value,
  //         disabled: newValue
  //       }
  //     });
  //   };

  //   changeDisplay = () => {
  //     const { modal } = this.state;

  //     this.setState({
  //       modal: {
  //         ...modal,
  //         display: modal.display === "none" ? "flex" : "none"
  //       }
  //     });
  //   };

  //   addProduct = event => {
  //     const { modal, customerId } = this.state;

  //     event.preventDefault();

  //     let data = {
  //       customerId: customerId,
  //       name: modal.name
  //     };

  //     let json = {
  //       action: "insertProduct",
  //       data: data
  //     };

  //     let config = {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json, application/x-www-form-urlencoded"
  //       }
  //     };

  //     axios
  //       .post("http://localhost/mmcSupport/backend/", json, config)
  //       .then(resp => {
  //         this.setState({
  //           modal: {
  //             ...modal,
  //             display: "none",
  //             name: "",
  //             disabled: true
  //           }
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   };

  //   <button onClick={this.changeDisplay}>Popup</button>
  //         <AddProductPopup
  //           modal={modal}
  //           changeDisplay={this.changeDisplay}
  //           changeValue={this.changeValue}
  //           addProduct={this.addProduct}
  //         />

  return (
    <div className="wrapper">
      <div className="modal-wrap" style={{ display: modal.display }}>
        <div className="achtergrond" onClick={changeDisplay} />
        <div className="modal">
          <h2 className="modal__titel">Add product</h2>
          <form className="modal__form">
            <label className="modal__form--label">Name</label>
            <br />
            <input
              className="modal__form--input"
              type="text"
              name="name"
              value={modal.name}
              onChange={changeValue}
            />
            <br />
            <input
              className="modal__form--submit"
              type="submit"
              value="Add product"
              onClick={addProduct}
              disabled={modal.disabled}
            />
          </form>
          <input
            className="modal__form--close"
            type="button"
            value="X"
            onClick={changeDisplay}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductPopup;
