import {
  LOGIN,
  GET_AUTHANTICATION,
  GET_USER,
  GET_USERS
} from "../actions/types";

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
    default:
      return state;
  }
}
