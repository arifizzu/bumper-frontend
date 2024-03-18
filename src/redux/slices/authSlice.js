import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      // console.log("loginStart");
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      console.log("action", action.payload);
      // console.log("state.user", state.user);
      // console.log("loginSuccess");
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("loginFailure");
      // console.log("state.error", state.error);
    },
    logoutStart: (state) => {
      state.loading = true;
      state.error = null;
      // console.log("logoutStart");
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      // console.log("state.user", state.user);
      // console.log("logoutSuccess");
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("loginFailure");
      // console.log("state.error", state.error);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
