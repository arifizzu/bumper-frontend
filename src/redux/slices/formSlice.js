import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [], //used for index form
  form: null, //used for show form
  formDetailInput: null, //used for create new form
  loading: false,
  error: null,
  formsEdit: {}, //used for edit form including fields
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

    editFormStart(state) {
      state.loading = true;
      state.error = null;
    },
    editFormSuccess(state, action) {
      state.loading = false;
      const { id, formData } = action.payload;
      state.formsEdit[id] = formData; // Store form data with the corresponding user ID
      state.error = null;
      // console.log("action", action);
    },
    editFormFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      // console.log("action", action);
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
  editFormStart,
  editFormSuccess,
  editFormFailure,
} = formSlice.actions;

export default formSlice.reducer;
