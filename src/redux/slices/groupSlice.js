import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [], //used for index group
  group: null, //used for show group
  form: null, //used for create new group
  forms: {}, //used for edit group
  loading: false,
  error: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    getGroupsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getGroupsSuccess(state, action) {
      state.loading = false;
      state.groups = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getGroupsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createGroupStart(state) {
      state.loading = true;
      state.error = null;
    },
    createGroupSuccess(state, action) {
      state.loading = false;
      state.form = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createGroupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editGroupStart(state) {
      state.loading = true;
      state.error = null;
    },
    editGroupSuccess(state, action) {
      state.loading = false;
      const { id, formData } = action.payload;
      state.forms[id] = formData; // Store form data with the corresponding group ID
      state.error = null;
      // console.log("action", action);
    },
    editGroupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      // console.log("action", action);
    },

    showGroupStart(state) {
      state.loading = true;
      state.error = null;
    },
    showGroupSuccess(state, action) {
      state.loading = false;
      state.group = action.payload;
      state.error = null;
      // console.log("action", action);
      // console.log("state.group", state.group);
    },
    showGroupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteGroupStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteGroupSuccess(state, action) {
      state.loading = false;
      state.groups = state.groups.filter(
        (groups) => groups.id !== action.payload
      );
      state.error = null;
      // console.log("action", action);
    },
    deleteGroupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
  createGroupStart,
  createGroupSuccess,
  createGroupFailure,
  editGroupStart,
  editGroupSuccess,
  editGroupFailure,
  showGroupStart,
  showGroupSuccess,
  showGroupFailure,
  deleteGroupStart,
  deleteGroupSuccess,
  deleteGroupFailure,
} = groupSlice.actions;

export default groupSlice.reducer;
