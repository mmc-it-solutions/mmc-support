import axios from "axios";

import {
  GET_TICKET,
  GET_TICKETS,
  INSERT_TICKET,
  UPDATE_TICKETSTATUS
} from "./types";

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
      title: form["title"],
      description: form["description"],
      customerId: form["customerId"],
      productId: form["productId"]
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

export const updateTicketStatus = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "updateTicketStatus",
    data: {
      id: form["id"],
      newStatus: form["newStatus"]
    }
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: UPDATE_TICKETSTATUS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
