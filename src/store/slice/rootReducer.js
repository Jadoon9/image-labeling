import { combineReducers } from "@reduxjs/toolkit";
import { authApiService } from "../services/authService";
import { noAuthApiService } from "../services/noAuthService";
import authSlice from "./authSlice";
import layoutSlice from "./layoutSlice";
import folderSlice from "./foldersSlice";

//Import  Reducers

export const appReducers = combineReducers({
  [noAuthApiService.reducerPath]: noAuthApiService.reducer,
  [authApiService.reducerPath]: authApiService.reducer,
  auth: authSlice,
  layout: layoutSlice,
  folders: folderSlice,
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
