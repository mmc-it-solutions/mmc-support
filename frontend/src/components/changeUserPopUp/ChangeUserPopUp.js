import React, { useState } from "react";

import "../Layout/Modal/Modal.css";

const ChangeUserPopUp = ({ modal, onClose, submitHandler, userId, users }) => {
  const [userIdHook, setUserIdHook] = useState(userId);

  return (
    <div className="modal-wrap" style={{ display: modal.display }}>
      <div className="achtergrond" onClick={onClose} />
      <div className="modal">
        <h2 className="modal__titel">Change User</h2>
        <form
          className="modal__form"
          onSubmit={submitHandler.bind(this, "user", userIdHook)}
        >
          <select
            className="modal__form--select"
            value={userIdHook}
            onChange={event => setUserIdHook(event.target.value)}
          >
            <option value={0}>None</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.profile.first_name} {user.profile.last_name}
              </option>
            ))}
          </select>
          <input
            className="modal__form--submit"
            type="submit"
            value="Select User"
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

export default ChangeUserPopUp;
