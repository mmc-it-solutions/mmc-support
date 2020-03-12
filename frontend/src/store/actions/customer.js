import axios from "axios";

import { GET_CUSTOMER, GET_CUSTOMERS, INSERT_CUSTOMER } from "./types";

export const getCustomer = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "getCustomer",
    data: { customerId: form.customerId }
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: GET_CUSTOMER,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getCustomers = () => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "getCustomers",
    data: {}
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const createCustomer = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "insertCustomer",
    data: {
      name: form["name"],
      company_name: form["company_name"],
      email: form["email"],
      phone_number: form["phone_number"]
    }
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: INSERT_CUSTOMER,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
