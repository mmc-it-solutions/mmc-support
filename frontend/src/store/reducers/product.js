import { GET_PRODUCTS, INSERT_PRODUCT } from "../actions/types";

const initialState = {
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case INSERT_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    default:
      return state;
  }
}
