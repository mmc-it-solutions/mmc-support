import React from "react";
import { NavLink } from "react-router-dom";
import "./List.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ListHead = ({ extraClass, columns }) => (
  <div className={"list-head-row " + extraClass + "-list-row"}>
    {columns.map((columnName, index) => (
      <div key={index} className="list-head-row-item">
        {columnName}
      </div>
    ))}
  </div>
);

const ListItems = ({ extraClass, columnNames, columnValues, btnActions }) => (
  <div className="list-body">
    {columnValues.map((rowData, rowIndex) => {
      let amountOfBtnActions = -1;
      return (
        <div
          key={rowIndex}
          className={"list-body-row " + extraClass + "-list-row"}
        >
          {rowData.map((columnData, columnIndex) => {
            if (columnNames[columnIndex] === "Status") {
              return (
                <div key={columnIndex} className="list-body-row-item">
                  <select
                    className="list-body-row-select"
                    value={columnData}
                    onChange={(event) => {
                      btnActions[columnNames[columnIndex]](
                        rowData[0],
                        event.target.value
                      );
                    }}
                  >
                    <option value={1}>To do</option>
                    <option value={2}>Doing</option>
                    <option value={3}>Done</option>
                  </select>
                </div>
              );
            }

            if (columnNames[columnIndex] === "Actions") {
              return (
                <div key={columnIndex} className="list-body-row-item FA">
                  <NavLink to={"/tickets/" + rowData[0]}>
                    <FontAwesomeIcon icon={faEye} />
                  </NavLink>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </div>
              );
            }
            return (
              <div key={columnIndex} className="list-body-row-item">
                {columnData}
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
);

const List = ({
  extraClass,
  listColumnsNames,
  listColumnsValues,
  btnActions,
}) => (
  <div className="list">
    <ListHead extraClass={extraClass} columns={listColumnsNames} />
    <ListItems
      extraClass={extraClass}
      columnNames={listColumnsNames}
      columnValues={listColumnsValues}
      btnActions={btnActions}
    />
  </div>
);

export default List;
