import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datalists: [], //used for index datalist
  datalist: null, //used for show datalist
  formDatalist: null, //used for create new datalist
  formsDatalist: {}, //used for edit datalist
  loading: false,
  error: null,
};

export const datalistSlice = createSlice({
  name: "datalist",
  initialState,
  reducers: {
    getDatalistsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDatalistsSuccess(state, action) {
      state.loading = false;
      state.datalists = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getDatalistsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createDatalistStart(state) {
      state.loading = true;
      state.error = null;
    },
    createDatalistSuccess(state, action) {
      state.loading = false;
      state.formDatalist = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createDatalistFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editDatalistStart(state) {
      state.loading = true;
      state.error = null;
    },
    editDatalistSuccess(state, action) {
      state.loading = false;
      const { id, formData } = action.payload;
      state.formsDatalist[id] = formData; // Store form data with the corresponding datalist ID
      state.error = null;
    },
    editDatalistFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    showDatalistStart(state) {
      state.loading = true;
      state.error = null;
    },
    showDatalistSuccess(state, action) {
      state.loading = false;
      state.datalist = action.payload;
      state.error = null;
    },
    showDatalistFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteDatalistStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteDatalistSuccess(state, action) {
      state.loading = false;
      state.datalists = state.datalists.filter(
        (datalists) => datalists.id !== action.payload
      );
      state.error = null;
    },
    deleteDatalistFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDatalistsStart,
  getDatalistsSuccess,
  getDatalistsFailure,
  createDatalistStart,
  createDatalistSuccess,
  createDatalistFailure,
  editDatalistStart,
  editDatalistSuccess,
  editDatalistFailure,
  showDatalistStart,
  showDatalistSuccess,
  showDatalistFailure,
  deleteDatalistStart,
  deleteDatalistSuccess,
  deleteDatalistFailure,
} = datalistSlice.actions;

export default datalistSlice.reducer;
