import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "",
  isLoggedIn: false,
  data: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedIn = true;
      state.data = action.payload;
    },
    userLogout: (state, action) => {
      localStorage.removeItem("persist:root");
      localStorage.removeItem("token");
      state.userType = "";
      state.isLoggedIn = false;
      state.data = "";
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
