import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datalistColumns: [], //used for index datalist column
  datalistColumn: null, //used for show datalist column
  formDatalistColumn: null, //used for create new datalist column
  formsDatalistColumn: {}, //used for edit datalist column
  loading: false,
  error: null,
};

export const datalistColumnSlice = createSlice({
  name: "datalistColumn",
  initialState,
  reducers: {
    getDatalistColumnsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDatalistColumnsSuccess(state, action) {
      state.loading = false;
      state.datalists = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getDatalistColumnsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createDatalistColumnStart(state) {
      state.loading = true;
      state.error = null;
    },
    createDatalistColumnSuccess(state, action) {
      state.loading = false;
      state.formDatalist = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createDatalistColumnFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editDatalistColumnStart(state) {
      state.loading = true;
      state.error = null;
    },
    editDatalistColumnSuccess(state, action) {
      state.loading = false;
      const { id, formData } = action.payload;
      state.formsDatalist[id] = formData; // Store form data with the corresponding datalist ID
      state.error = null;
    },
    editDatalistColumnFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    showDatalistColumnStart(state) {
      state.loading = true;
      state.error = null;
    },
    showDatalistColumnSuccess(state, action) {
      state.loading = false;
      state.datalist = action.payload;
      state.error = null;
    },
    showDatalistColumnFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteDatalistColumnStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteDatalistColumnSuccess(state, action) {
      state.loading = false;
      state.datalists = state.datalists.filter(
        (datalists) => datalists.id !== action.payload
      );
      state.error = null;
    },
    deleteDatalistColumnFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDatalistColumnsStart,
  getDatalistColumnsSuccess,
  getDatalistColumnsFailure,
  createDatalistColumnStart,
  createDatalistColumnSuccess,
  createDatalistColumnFailure,
  editDatalistColumnStart,
  editDatalistColumnSuccess,
  editDatalistColumnFailure,
  showDatalistColumnStart,
  showDatalistColumnSuccess,
  showDatalistColumnFailure,
  deleteDatalistColumnStart,
  deleteDatalistColumnSuccess,
  deleteDatalistColumnFailure,
} = datalistColumnSlice.actions;

export default datalistColumnSlice.reducer;
