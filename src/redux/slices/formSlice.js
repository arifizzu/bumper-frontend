import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [], //used for index form
  form: null, //used for show form
  formDetailInput: null, //used for create new form
  loading: false,
  error: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    getFormsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getFormsSuccess(state, action) {
      state.loading = false;
      state.forms = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getFormsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createFormStart(state) {
      state.loading = true;
      state.error = null;
    },
    createFormSuccess(state, action) {
      state.loading = false;
      state.formDetailInput = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createFormFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteFormStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFormSuccess(state, action) {
      state.loading = false;
      state.forms = state.forms.filter((forms) => forms.id !== action.payload);
      state.error = null;
      // console.log("action", action);
    },
    deleteFormFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    showFormStart(state) {
      state.loading = true;
      state.error = null;
    },
    showFormSuccess(state, action) {
      state.loading = false;
      state.form = action.payload;
      state.error = null;
    },
    showFormFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getFormsStart,
  getFormsSuccess,
  getFormsFailure,
  createFormStart,
  createFormSuccess,
  createFormFailure,
  deleteFormStart,
  deleteFormSuccess,
  deleteFormFailure,
  showFormStart,
  showFormSuccess,
  showFormFailure,
} = formSlice.actions;

export default formSlice.reducer;
