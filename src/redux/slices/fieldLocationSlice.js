import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fieldLocations: [], //used for index field location
  loading: false,
  error: null,
};

const fieldLocationSlice = createSlice({
  name: "fieldLocation",
  initialState,
  reducers: {},
});

export const {} = fieldLocationSlice.actions;

export default fieldLocationSlice.reducer;
