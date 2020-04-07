import React from "react";

const header = ({ title, btnText, btnAction }) => (
  <div className="head">
    <h2 className="head-title"> {title} </h2>
    <div className="head-add">
      <button className="head-add-btn" onClick={btnAction}>
        {btnText}
      </button>
    </div>
    <div className="head-search">
      <input
        type="text"
        className="head-search-input"
        placeholder="Search..."
      />
    </div>
  </div>
);

export default header;
