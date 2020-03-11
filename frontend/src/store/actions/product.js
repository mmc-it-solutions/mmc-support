import axios from "axios";

import { INSERT_PRODUCT } from "./types";

export const createProduct = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "insertProduct",
    data: {
      name: form["name"],
      customerId: form["customerId"]
    }
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: INSERT_PRODUCT,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
