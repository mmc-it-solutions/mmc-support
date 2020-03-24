import React from "react";

import "../Layout/Modal/Modal.css";

const UpdateProductPopup = ({
  modal,
  changeDisplay,
  changeValue,
  updateProduct
}) => {
  return (
    <div className="wrapper">
      <div className="modal-wrap" style={{ display: modal.display }}>
        <div className="achtergrond" onClick={changeDisplay} />
        <div className="modal">
          <h2 className="modal__titel">Update product</h2>
          <form className="modal__form">
            <label className="modal__form--label">Name</label>
            <br />
            <input
              className="modal__form--input"
              type="text"
              name="name"
              onChange={changeValue}
              value={modal.name}
              required
            />
            <input
              className="modal__form--submit"
              type="submit"
              value="Update product"
              onClick={updateProduct}
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

export default UpdateProductPopup;
