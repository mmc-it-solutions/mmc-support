import axios from "axios";

import { LOGIN } from "./types";

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
    .post("http://localhost/mmcSupport/backend/", body, config)
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
