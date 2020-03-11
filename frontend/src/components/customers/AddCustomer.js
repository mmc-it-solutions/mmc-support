import React from "react";
import "./AddCustomer.css";

const AddCustomer = ({ modal, onClose, onChange, submitHandler }) => {
  return (
    <div className="modal-wrap" style={{ display: modal.display }}>
      <div className="achtergrond" onClick={onClose} />
      <div className="modal">
        <h2 className="modal__titel">Add customer</h2>
        <form className="modal__form" onSubmit={submitHandler}>
          <label className="modal__form--label">Company Name</label>
          <br />
          <input
            className="modal__form--input"
            type="text"
            name="company"
            value={modal.company}
            onChange={onChange}
            required
          />
          <label className="modal__form--label">Name</label>
          <br />
          <input
            className="modal__form--input"
            type="text"
            name="name"
            value={modal.name}
            onChange={onChange}
            required
          />

          <div className="container">
            <div className="modal1">
              <label className="modal__form--label">Email</label>
              <br />
              <input
                className="modal__form--input"
                type="email"
                name="email"
                value={modal.email}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="modal__form--label">Phone</label>
              <br />
              <input
                className="modal__form--input"
                type="text"
                name="phone"
                value={modal.phone}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <input
            className="modal__form--submit"
            type="submit"
            value="Add Company"
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

export default AddCustomer;
