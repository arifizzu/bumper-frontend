import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    showUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    showUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      // console.log("action", action);
      // console.log("state.user", state.user);
    },
    showUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state, action) {
      state.loading = false;
      state.users = state.users.filter((users) => users.id !== action.payload);
      state.error = null;
      // console.log("action", action);
    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  showUserStart,
  showUserSuccess,
  showUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;