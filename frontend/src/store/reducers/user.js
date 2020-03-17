import { LOGIN, GET_USER, GET_USERS, INSERT_USER } from "../actions/types";

const initialState = {
  user: [],
  users: [],
  authantication: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authantication: action.payload
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };

    case INSERT_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };

    default:
      return state;
  }
}
