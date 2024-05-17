import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fieldListValues: [], //used for index field list values
  loading: false,
  error: null,
};

const fieldListValueSlice = createSlice({
  name: "fieldListValue",
  initialState,
  reducers: {},
});

export const {} = fieldListValueSlice.actions;

export default fieldListValueSlice.reducer;
