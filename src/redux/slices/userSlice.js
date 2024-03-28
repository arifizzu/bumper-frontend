import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], //used for index user
  user: null, //used for show user
  form: null, //used for create new user
  forms: {}, //used for edit user
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

    createUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess(state, action) {
      state.loading = false;
      state.form = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    editUserSuccess(state, action) {
      state.loading = false;
      const { id, formData } = action.payload;
      state.forms[id] = formData; // Store form data with the corresponding user ID
      state.error = null;
      // console.log("action", action);
    },
    editUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      // console.log("action", action);
    },

    // updateTodo(state, action) {
    //   const { id, text } = action.payload;
    //   const todoToUpdate = state.todos.find((todo) => todo.id === id);
    //   if (todoToUpdate) {
    //     todoToUpdate.text = text;
    //   }
    // },

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
  createUserStart,
  createUserSuccess,
  createUserFailure,
  editUserStart,
  editUserSuccess,
  editUserFailure,
  showUserStart,
  showUserSuccess,
  showUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
