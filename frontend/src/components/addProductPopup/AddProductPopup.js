import React from "react";

import "../Layout/Modal/Modal.css";

const AddProductPopup = ({ modal, changeValue, changeDisplay, addProduct }) => {
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
