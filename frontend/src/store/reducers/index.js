// All the reducer state fro the application
import { combineReducers } from "redux";
import customer from "./customer";
import ticket from "./ticket";

export default combineReducers({
  customer,
  ticket
});
