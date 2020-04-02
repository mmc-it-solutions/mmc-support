import React, { useState, useEffect } from "react";

import "../Layout/Modal/Modal.css";

const UpdateCustomerPopup = ({
  modal,
  changeDisplay,
  updateCustomer,
  customer
}) => {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerValue, setCustomerValue] = useState("");

  useEffect(() => {
    if (customer !== customerValue) {
      setCompanyName(customer.name);
      setName(customer.contact.name);
      setEmail(customer.contact.email);
      setPhoneNumber(customer.contact.phone);
      setCustomerValue(customer);
    }
  });

  return (
    <div className="wrapper">
      <div className="modal-wrap" style={{ display: modal.display }}>
        <div className="achtergrond" onClick={changeDisplay} />
        <div className="modal">
          <h2 className="modal__titel">Update Customer</h2>
          <form className="modal__form">
            <label className="modal__form--label">Company Name</label>
            <br />
            <input
              className="modal__form--input"
              type="text"
              name="company"
              onChange={event => setCompanyName(event.target.value)}
              value={companyName}
              required
            />
            <label className="modal__form--label">Name</label>
            <br />
            <input
              className="modal__form--input"
              type="text"
              name="name"
              onChange={event => setName(event.target.value)}
              value={name}
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
                  onChange={event => setEmail(event.target.value)}
                  value={email}
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
                  onChange={event => setPhoneNumber(event.target.value)}
                  value={phoneNumber}
                  required
                />
              </div>
            </div>
            <input
              className="modal__form--submit"
              type="submit"
              value="Update customer"
              onClick={updateCustomer.bind(
                this,
                companyName,
                name,
                email,
                phoneNumber
              )}
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

export default UpdateCustomerPopup;
