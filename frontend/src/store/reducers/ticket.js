import {
  GET_TICKET,
  GET_TICKETS,
  INSERT_TICKET,
  UPDATE_TICKETSTATUS,
  UPDATE_CUSTOMER_OF_TICKET
} from "../actions/types";

const initialState = {
  ticket: [],
  tickets: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TICKET:
    case UPDATE_CUSTOMER_OF_TICKET:
      return {
        ...state,
        ticket: action.payload
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload
      };
    case INSERT_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload]
      };
    case UPDATE_TICKETSTATUS:
      return {
        ...state,
        tickets: action.payload
      };
    default:
      return state;
  }
}
