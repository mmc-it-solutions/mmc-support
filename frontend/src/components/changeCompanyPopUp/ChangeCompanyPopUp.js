import React, { useState } from "react";

import "../Layout/Modal/Modal.css";

const ChangeCompanyPopUp = ({
  modal,
  onClose,
  submitHandler,
  customerId,
  customers
}) => {
  const [companyId, setCompanyId] = useState(customerId);
  return (
    <div className="modal-wrap" style={{ display: modal.display }}>
      <div className="achtergrond" onClick={onClose} />
      <div className="modal">
        <h2 className="modal__titel">Change Company</h2>
        <form
          className="modal__form"
          onSubmit={submitHandler.bind(this, "company", companyId)}
        >
          <select
            className="modal__form--select"
            value={companyId}
            onChange={event => setCompanyId(event.target.value)}
          >
            <option value={0}>none</option>
            {customers.map(customer => (
              <option value={customer.id}>{customer.name}</option>
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

export default ChangeCompanyPopUp;
