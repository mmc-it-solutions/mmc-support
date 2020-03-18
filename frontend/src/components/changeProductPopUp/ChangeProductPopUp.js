import React, { useState } from "react";

import "../Layout/Modal/Modal.css";

const ChangeProductPopUp = ({
  modal,
  onClose,
  submitHandler,
  productId,
  customer
}) => {
  const [productId, setProductId] = useState(productId);
  return (
    <div className="modal-wrap" style={{ display: modal.display }}>
      <div className="achtergrond" onClick={onClose} />
      <div className="modal">
        <h2 className="modal__titel">Change Product</h2>
        <form
          className="modal__form"
          onSubmit={submitHandler.bind(this, "produc", productId)}
        >
          <select
            className="modal__form--select"
            value={productId}
            onChange={event => setproducId(event.target.value)}
          >
            <option value={0}>None</option>
            {customers.map(product => (
              <option key={produc.id} value={produc.id}>
                {produc.name}
              </option>
            ))}
          </select>
          <input
            className="modal__form--submit"
            type="submit"
            value="Select Company"
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

export default ChangeProductPopUp;
