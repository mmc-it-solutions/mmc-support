import axios from "axios";

import { URL } from "../connection/vars";

import { LOGIN, GET_USER, GET_USERS, INSERT_USER } from "./types";

export const login = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "login",
    data: {
      username: form.username,
      password: btoa(form.password)
    }
  };

  axios
    .post(URL, body, config)
    .then(res => {
      dispatch({
        type: LOGIN,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getUser = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "getUser",
    data: {
      userId: form.userId
    }
  };

  axios
    .post(URL, body, config)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getUsers = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "getUsers",
    data: {}
  };

  axios
    .post(URL, body, config)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const insertUser = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "insertUser",
    data: {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: btoa(form.password),
      position: form.position
    }
  };

  axios
    .post(URL, body, config)
    .then(res => {
      dispatch({
        type: INSERT_USER,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
