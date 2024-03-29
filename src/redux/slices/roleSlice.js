import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [], //used for index role
  role: null, //used for show role
  form: null, //used for create new role
  forms: {}, //used for edit role
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    getRolesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRolesSuccess(state, action) {
      state.loading = false;
      state.roles = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getRolesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createRoleStart(state) {
      state.loading = true;
      state.error = null;
    },
    createRoleSuccess(state, action) {
      state.loading = false;
      state.form = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createRoleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editRoleStart(state) {
      state.loading = true;
      state.error = null;
    },
    editRoleSuccess(state, action) {
      state.loading = false;
      const { id, formData } = action.payload;
      state.forms[id] = formData; // Store form data with the corresponding role ID
      state.error = null;
      // console.log("action", action);
    },
    editRoleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      // console.log("action", action);
    },

    showRoleStart(state) {
      state.loading = true;
      state.error = null;
    },
    showRoleSuccess(state, action) {
      state.loading = false;
      state.role = action.payload;
      state.error = null;
    },
    showRoleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteRoleStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteRoleSuccess(state, action) {
      state.loading = false;
      state.roles = state.roles.filter((roles) => roles.id !== action.payload);
      state.error = null;
      // console.log("action", action);
    },
    deleteRoleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getRolesStart,
  getRolesSuccess,
  getRolesFailure,
  createRoleStart,
  createRoleSuccess,
  createRoleFailure,
  editRoleStart,
  editRoleSuccess,
  editRoleFailure,
  showRoleStart,
  showRoleSuccess,
  showRoleFailure,
  deleteRoleStart,
  deleteRoleSuccess,
  deleteRoleFailure,
} = roleSlice.actions;

export default roleSlice.reducer;
