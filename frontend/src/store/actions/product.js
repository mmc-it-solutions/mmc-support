import axios from "axios";

import { INSERT_PRODUCT, GET_PRODUCTS, INSERT_EXISTING_PRODUCT } from "./types";

export const getProducts = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "getProducts",
    data: {
      customerId: form["customerId"],
      productIdRemove: form["productIdRemove"]
    }
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

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

export const createExistingProduct = form => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    action: "insertExistingProduct",
    data: {
      customerId: form["customerId"],
      productId: form["productId"]
    }
  };

  axios
    .post("http://localhost/mmcSupport/backend/", body, config)
    .then(res => {
      dispatch({
        type: INSERT_EXISTING_PRODUCT,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
