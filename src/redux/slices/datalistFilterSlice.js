import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datalistFilters: [], //used for index datalist filter
  datalistFilter: null, //used for show datalist filter
  formDatalistFilter: null, //used for create new datalist filter
  formsDatalistFilter: {}, //used for edit datalist filter
  loading: false,
  error: null,
};

export const datalistFilterSlice = createSlice({
  name: "datalistFilter",
  initialState,
  reducers: {
    getDatalistFiltersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDatalistFiltersSuccess(state, action) {
      state.loading = false;
      state.datalists = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getDatalistFiltersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createDatalistFilterStart(state) {
      state.loading = true;
      state.error = null;
    },
    createDatalistFilterSuccess(state, action) {
      state.loading = false;
      state.formDatalist = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createDatalistFilterFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editDatalistFilterStart(state) {
      state.loading = true;
      state.error = null;
    },
    editDatalistFilterSuccess(state, action) {
      state.loading = false;
      const { id, formData } = action.payload;
      state.formsDatalist[id] = formData; // Store form data with the corresponding datalist ID
      state.error = null;
    },
    editDatalistFilterFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    showDatalistFilterStart(state) {
      state.loading = true;
      state.error = null;
    },
    showDatalistFilterSuccess(state, action) {
      state.loading = false;
      state.datalist = action.payload;
      state.error = null;
    },
    showDatalistFilterFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteDatalistFilterStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteDatalistFilterSuccess(state, action) {
      state.loading = false;
      state.datalists = state.datalists.filter(
        (datalists) => datalists.id !== action.payload
      );
      state.error = null;
    },
    deleteDatalistFilterFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDatalistFiltersStart,
  getDatalistFiltersSuccess,
  getDatalistFiltersFailure,
  createDatalistFilterStart,
  createDatalistFilterSuccess,
  createDatalistFilterFailure,
  editDatalistFilterStart,
  editDatalistFilterSuccess,
  editDatalistFilterFailure,
  showDatalistFilterStart,
  showDatalistFilterSuccess,
  showDatalistFilterFailure,
  deleteDatalistFilterStart,
  deleteDatalistFilterSuccess,
  deleteDatalistFilterFailure,
} = datalistFilterSlice.actions;

export default datalistFilterSlice.reducer;
