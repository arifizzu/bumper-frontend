import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processes: [],
  process: null,
  loading: false,
  error: null,
};

export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    getProcessesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getProcessesSuccess(state, action) {
      state.loading = false;
      state.processes = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getProcessesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getCreateProcessStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCreateProcessSuccess(state, action) {
      state.loading = false;
      state.process = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    getCreateProcessFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProcessStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProcessSuccess(state, action) {
      state.loading = false;
      state.processes = state.processes.filter(
        (processes) => processes.id !== action.payload
      );
      state.error = null;
      // console.log("action", action);
    },
    deleteProcessFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProcessesStart,
  getProcessesSuccess,
  getProcessesFailure,
  getCreateProcessStart,
  getCreateProcessSuccess,
  getCreateProcessFailure,
  deleteProcessStart,
  deleteProcessSuccess,
  deleteProcessFailure,
} = processSlice.actions;

export default processSlice.reducer;
