import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "../services/authService";
import { noAuthApiSlice } from "../services/noAuthService";

//Import  Reducers

export const appReducers = combineReducers({
  [noAuthApiSlice.reducerPath]: noAuthApiSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
});

export const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "RESET") {
    localStorage.removeItem("persist:root");
    localStorage.removeItem("token");
    state = undefined;
  }

  return appReducers(state, action);
};
