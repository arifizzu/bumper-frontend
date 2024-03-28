import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: [], // fields associated to the form // used for view forms & view embedded
  field: null, //used to create new field
  fieldListInput: [], // used for list of fields created
  fieldType: [], // used to display Field Type
  loading: false,
  error: null,
};

export const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    // getFieldsStart(state) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // getFieldsSuccess(state, action) {
    //   state.loading = false;
    //   state.fields = action.payload;
    //   state.error = null;
    //   // console.log("action", action);
    // },
    // getFieldsFailure(state, action) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

    createFieldStart(state) {
      state.loading = true;
      state.error = null;
    },
    createFieldSuccess(state, action) {
      state.loading = false;
      state.field = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createFieldFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // deleteFieldStart(state) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // deleteFieldSuccess(state, action) {
    //   state.loading = false;
    //   state.fields = state.fields.filter(
    //     (fields) => fields.id !== action.payload
    //   );
    //   state.error = null;
    //   // console.log("action", action);
    // },
    // deleteFieldFailure(state, action) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

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
      state.fieldListInput.push(action.payload);
    },

    removeField: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.fieldListInput.length) {
        state.fieldListInput.splice(index, 1);
      }
    },
  },
});

export const {
  //   getFieldsStart,
  //   getFieldsSuccess,
  //   getFieldsFailure,
  createFieldStart,
  createFieldSuccess,
  createFieldFailure,
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
