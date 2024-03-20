import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
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
  },
});

export const { getFormsStart, getFormsSuccess, getFormsFailure } =
  formSlice.actions;

export default formSlice.reducer;
