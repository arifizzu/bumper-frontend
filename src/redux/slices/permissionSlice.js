import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: [], //used for index permission
  permission: null, //used for show permission
  form: null, //used for create new permission
  forms: {}, //used for edit permission
  loading: false,
  error: null,
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    getPermissionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getPermissionsSuccess(state, action) {
      state.loading = false;
      state.permissions = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getPermissionsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createPermissionStart(state) {
      state.loading = true;
      state.error = null;
    },
    createPermissionSuccess(state, action) {
      state.loading = false;
      state.form = action.payload;
      state.error = null;
    },
    createPermissionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editPermissionStart(state) {
      state.loading = true;
      state.error = null;
    },
    editPermissionSuccess(state, action) {
      state.loading = false;
      const { id, formData } = action.payload;
      state.forms[id] = formData; // Store form data with the corresponding permission ID
      state.error = null;
    },
    editPermissionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    showPermissionStart(state) {
      state.loading = true;
      state.error = null;
    },
    showPermissionSuccess(state, action) {
      state.loading = false;
      state.permission = action.payload;
      state.error = null;
    },
    showPermissionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deletePermissionStart(state) {
      state.loading = true;
      state.error = null;
    },
    deletePermissionSuccess(state, action) {
      state.loading = false;
      state.permissions = state.permissions.filter(
        (permissions) => permissions.id !== action.payload
      );
      state.error = null;
    },
    deletePermissionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPermissionsStart,
  getPermissionsSuccess,
  getPermissionsFailure,
  createPermissionStart,
  createPermissionSuccess,
  createPermissionFailure,
  editPermissionStart,
  editPermissionSuccess,
  editPermissionFailure,
  showPermissionStart,
  showPermissionSuccess,
  showPermissionFailure,
  deletePermissionStart,
  deletePermissionSuccess,
  deletePermissionFailure,
} = permissionSlice.actions;

export default permissionSlice.reducer;
