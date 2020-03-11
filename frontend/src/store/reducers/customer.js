import { GET_CUSTOMER, GET_CUSTOMERS, INSERT_CUSTOMER } from "../actions/types";

const initialState = {
  customer: [],
  customers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER:
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
    default:
      return state;
  }
}
