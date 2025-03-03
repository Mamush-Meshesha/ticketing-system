import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth"
import stateReducer from "./state"
import tiketReducer from "./tiket"
import userReducer from "./users"

const rootReducer = combineReducers({
  auth: authReducer, 
  sidebar: stateReducer,
  tiket: tiketReducer,
  users: userReducer
});
export default rootReducer