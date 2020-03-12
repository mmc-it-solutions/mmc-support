// All the reducer state fro the application
import { combineReducers } from "redux";
import customer from "./customer";
import ticket from "./ticket";
import product from "./product";

export default combineReducers({
  customer,
  ticket,
  product
});
