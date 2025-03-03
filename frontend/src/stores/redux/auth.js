import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token"),
  isAuth: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.isLoading = true;
    },
    authSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    authFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerReuest: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    logoutRequest: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    logoutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  },
});
export const {
  authRequest,
  authSuccess,
  authFailure,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  registerReuest,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;