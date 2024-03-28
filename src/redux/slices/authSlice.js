import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  roles: [],
  permissions: [],
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
      localStorage.setItem("isAuthenticated", "true");
      state.user = action.payload.user;
      // state.roles = action.payload.roles;
      // state.permissions = action.payload.roles;
      localStorage.setItem("roles", JSON.stringify(action.payload.roles));
      localStorage.setItem(
        "permissions",
        JSON.stringify(action.payload.permissions)
      );
      console.log("action", action.payload);
      // console.log("loginSuccess");
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("loginFailure");
    },
    logoutStart: (state) => {
      state.loading = true;
      state.error = null;
      // console.log("logoutStart");
    },
    logoutSuccess: (state) => {
      state.loading = false;
      localStorage.removeItem("isAuthenticated");
      state.user = null;
      // console.log("logoutSuccess");
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("loginFailure");
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
