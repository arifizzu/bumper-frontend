import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: [],
  field: null,
  fieldList: [],
  fieldType: [],
  loading: false,
  error: null,
};

export const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    getFieldsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getFieldsSuccess(state, action) {
      state.loading = false;
      state.fields = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getFieldsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getCreateFieldStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCreateFieldSuccess(state, action) {
      state.loading = false;
      state.field = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getCreateFieldFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteFieldStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFieldSuccess(state, action) {
      state.loading = false;
      state.fields = state.fields.filter(
        (fields) => fields.id !== action.payload
      );
      state.error = null;
      // console.log("action", action);
    },
    deleteFieldFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getFieldTypeStart(state) {
      state.loading = true;
      state.error = null;
    },
    getFieldTypeSuccess(state, action) {
      state.loading = false;
      state.fieldType = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getFieldTypeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    showFieldStart(state) {
      state.loading = true;
      state.error = null;
    },
    showFieldSuccess(state, action) {
      state.loading = false;
      state.fields = action.payload;
      state.error = null;
    },
    showFieldFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addField: (state, action) => {
      state.fields.push(action.payload);
    },

    removeField: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.fields.length) {
        state.fields.splice(index, 1);
      }
    },
  },
});

export const {
  //   getFieldsStart,
  //   getFieldsSuccess,
  //   getFieldsFailure,
  getCreateFieldStart,
  getCreateFieldSuccess,
  getCreateFieldFailure,
  //   deletefieldStart,
  //   deletefieldSuccess,
  //   deletefieldFailure,
  getFieldTypeStart,
  getFieldTypeSuccess,
  getFieldTypeFailure,
  showFieldStart,
  showFieldSuccess,
  showFieldFailure,
  addField,
  removeField,
} = fieldSlice.actions;

export default fieldSlice.reducer;
