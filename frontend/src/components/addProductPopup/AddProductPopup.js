import React, { useState } from "react";

import "../Layout/Modal/Modal.css";

const AddProductPopup = ({
  modal,
  changeValue,
  changeDisplay,
  addProduct,
  addExistingProduct,
  products
}) => {
  const [changeModal, changeModalSet] = useState(false);
  const [productId, productIdSet] = useState(0);

  if (changeModal) {
    return (
      <div className="wrapper">
        <div className="modal-wrap" style={{ display: modal.display }}>
          <div className="achtergrond" onClick={changeDisplay} />
          <div className="modal">
            <h2 className="modal__titel">Add product</h2>
            <button
              className="modal__button--less-important"
              onClick={() => changeModalSet(false)}
            >
              Add new product
            </button>
            <form className="modal__form">
              <label className="modal__form--label">Product</label>
              <br />
              <select
                className="modal__form--select"
                value={productId}
                onChange={event => productIdSet(event.target.value)}
              >
                <option value={0}>None</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <br />
              <input
                className="modal__form--submit"
                type="submit"
                value="Add product"
                onClick={event => {
                  addExistingProduct(event, productId);
                  changeModalSet(false);
                  productIdSet(0);
                }}
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
  } else {
    return (
      <div className="wrapper">
        <div className="modal-wrap" style={{ display: modal.display }}>
          <div className="achtergrond" onClick={changeDisplay} />
          <div className="modal">
            <h2 className="modal__titel">Add product</h2>
            <button
              className="modal__button--less-important"
              onClick={() => changeModalSet(true)}
            >
              Add existing product
            </button>
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
  }
};

export default AddProductPopup;
