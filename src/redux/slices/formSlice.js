import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
  form: null,
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

    getCreateFormStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCreateFormSuccess(state, action) {
      state.loading = false;
      state.form = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getCreateFormFailure(state, action) {
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
  },
});

export const {
  getFormsStart,
  getFormsSuccess,
  getFormsFailure,
  getCreateFormStart,
  getCreateFormSuccess,
  getCreateFormFailure,
  deleteFormStart,
  deleteFormSuccess,
  deleteFormFailure,
} = formSlice.actions;

export default formSlice.reducer;
