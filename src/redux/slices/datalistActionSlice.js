import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datalistActions: [], //used for index datalist action
  datalistAction: null, //used for show datalist action
  formDatalistAction: null, //used for create new datalist action
  formsDatalistAction: {}, //used for edit datalist action
  loading: false,
  error: null,
};

export const datalistActionSlice = createSlice({
  name: "datalistAction",
  initialState,
  reducers: {
    getDatalistActionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDatalistActionsSuccess(state, action) {
      state.loading = false;
      state.datalists = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getDatalistActionsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createDatalistActionStart(state) {
      state.loading = true;
      state.error = null;
    },
    createDatalistActionSuccess(state, action) {
      state.loading = false;
      state.formDatalist = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createDatalistActionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editDatalistActionStart(state) {
      state.loading = true;
      state.error = null;
    },
    editDatalistActionSuccess(state, action) {
      state.loading = false;
      const { id, formData } = action.payload;
      state.formsDatalist[id] = formData; // Store form data with the corresponding datalist ID
      state.error = null;
    },
    editDatalistActionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    showDatalistActionStart(state) {
      state.loading = true;
      state.error = null;
    },
    showDatalistActionSuccess(state, action) {
      state.loading = false;
      state.datalist = action.payload;
      state.error = null;
    },
    showDatalistActionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteDatalistActionStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteDatalistActionSuccess(state, action) {
      state.loading = false;
      state.datalists = state.datalists.filter(
        (datalists) => datalists.id !== action.payload
      );
      state.error = null;
    },
    deleteDatalistActionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDatalistActionsStart,
  getDatalistActionsSuccess,
  getDatalistActionsFailure,
  createDatalistActionStart,
  createDatalistActionSuccess,
  createDatalistActionFailure,
  editDatalistActionStart,
  editDatalistActionSuccess,
  editDatalistActionFailure,
  showDatalistActionStart,
  showDatalistActionSuccess,
  showDatalistActionFailure,
  deleteDatalistActionStart,
  deleteDatalistActionSuccess,
  deleteDatalistActionFailure,
} = datalistActionSlice.actions;

export default datalistActionSlice.reducer;
