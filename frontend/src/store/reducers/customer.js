import {
  GET_CUSTOMER,
  GET_CUSTOMERS,
  INSERT_CUSTOMER,
  INSERT_PRODUCT,
  INSERT_EXISTING_PRODUCT,
  UPDATE_CUSTOMER,
  UPDATE_PRODUCT
} from "../actions/types";

const initialState = {
  customer: [],
  customers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER:
    case UPDATE_CUSTOMER:
    case UPDATE_PRODUCT:
      return {
        ...state,
        customer: action.payload
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    case INSERT_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload]
      };
    case INSERT_EXISTING_PRODUCT:
    case INSERT_PRODUCT:
      return {
        ...state,
        customer: {
          ...state.customer,
          products: action.payload
        }
      };
    default:
      return state;
  }
}
