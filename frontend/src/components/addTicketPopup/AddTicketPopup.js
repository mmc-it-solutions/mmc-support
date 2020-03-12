import React from "react";

import "./AddTicketPopup.css";

const AddTicketPopup = ({
  customers,
  customer,
  modal,
  onClose,
  onChange,
  onChangeCustomer,
  submitHandler
}) => {
  return (
    <div className="modal-wrap" style={{ display: modal.display }}>
      <div className="achtergrond" onClick={onClose} />
      <div className="modal">
        <h2 className="modal__titel">Add ticket</h2>
        <form className="modal__form" onSubmit={submitHandler}>
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
            onChange={onChangeCustomer}
          >
            <option value="0">none</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
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
            {Array.isArray(customer)
              ? null
              : customer.products.map(product => {
                  return <option value={product.id}>{product.name}</option>;
                })}
          </select>
          <br />
          <input
            className="modal__form--submit"
            type="submit"
            value="Add Ticket"
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
