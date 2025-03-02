import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth"
import stateReducer from "./state"
import tiketReducer from "./tiket"

const rootReducer = combineReducers({
  auth: authReducer, 
  sidebar: stateReducer,
  tiket: tiketReducer,

});
export default rootReducer