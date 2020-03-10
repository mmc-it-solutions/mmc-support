import axios from "axios";

import { GET_TICKET, GET_TICKETS, INSERT_TICKET } from "./types";

export const getTicket = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "getTicket",
    data: { ticketId: form["ticketId"] }
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: GET_TICKET,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getTickets = () => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "getTickets",
    data: {}
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: GET_TICKETS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const createTicket = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "insertTicket",
    data: {
      name: form["titel"],
      company_name: form["description"],
      email: form["customerId"],
      phone_number: form["productId"]
    }
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: INSERT_TICKET,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
