import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth"
import stateReducer from "./state"

const rootReducer = combineReducers({
  auth: authReducer, 
  sidebar: stateReducer

});
export default rootReducer