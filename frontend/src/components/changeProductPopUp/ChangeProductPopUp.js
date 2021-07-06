import React, { useState, useEffect } from "react";

import "../Layout/Modal/Modal.css";

const ChangeProductPopUp = ({
  modal,
  onClose,
  submitHandler,
  productId,
  customer
}) => {
  const [productIdHook, setProductIdHook] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (customer !== customerValue) {
      setProductIdHook(productId);
      setCustomerValue(customer);
    }

    if (first) {
      setProductIdHook(productId);
      setFirst(false);
    }
  });

  return (
    <div className="modal-wrap" style={{ display: modal.display }}>
      <div className="achtergrond" onClick={onClose} />
      <div className="modal">
        <h2 className="modal__titel">Change Product</h2>
        <form
          className="modal__form"
          onSubmit={submitHandler.bind(this, "product", productIdHook)}
        >
          <select
            className="modal__form--select"
            value={productIdHook}
            onChange={event => setProductIdHook(event.target.value)}
          >
            <option value={0}>None</option>
            {customer.products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            className="modal__form--submit"
            type="submit"
            value="Select Product"
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
