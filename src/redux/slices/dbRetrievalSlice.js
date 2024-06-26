import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableOptions: [],
  columnOptions: [],
  latestId: null,
  loading: false,
  error: null,
};

export const dbRetrievalSlice = createSlice({
  name: "dbRetrieval",
  initialState,
  reducers: {
    getTablesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getTablesSuccess(state, action) {
      state.loading = false;
      state.tableOptions = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getTablesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getColumnsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getColumnsSuccess(state, action) {
      state.loading = false;
      state.columnOptions = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getColumnsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getLatestIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    getLatestIdSuccess(state, action) {
      state.loading = false;
      state.latestId = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getLatestIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTablesStart,
  getTablesSuccess,
  getTablesFailure,
  getColumnsStart,
  getColumnsSuccess,
  getColumnsFailure,
  getLatestIdStart,
  getLatestIdSuccess,
  getLatestIdFailure,
} = dbRetrievalSlice.actions;

export default dbRetrievalSlice.reducer;
