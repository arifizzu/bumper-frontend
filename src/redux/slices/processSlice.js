import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processes: [], //used for index process
  process: null, //used for show process
  processForm: null, //used for create new process
  processForms: {}, //used for edit process
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

    createProcessStart(state) {
      state.loading = true;
      state.error = null;
    },
    createProcessSuccess(state, action) {
      state.loading = false;
      state.processForm = action.payload;
      state.error = null;
      // console.log("action", action);
    },
    createProcessFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editProcessStart(state) {
      state.loading = true;
      state.error = null;
    },
    editProcessSuccess(state, action) {
      state.loading = false;
      const { id, processData } = action.payload;
      state.processForms[id] = processData; // Store form data with the corresponding group ID
      state.error = null;
      // console.log("action", action);
    },
    editProcessFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      // console.log("action", action);
    },

    showProcessStart(state) {
      state.loading = true;
      state.error = null;
    },
    showProcessSuccess(state, action) {
      state.loading = false;
      state.process = action.payload;
      state.error = null;
    },
    showProcessFailure(state, action) {
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
  createProcessStart,
  createProcessSuccess,
  createProcessFailure,
  editProcessStart,
  editProcessSuccess,
  editProcessFailure,
  showProcessStart,
  showProcessSuccess,
  showProcessFailure,
  deleteProcessStart,
  deleteProcessSuccess,
  deleteProcessFailure,
} = processSlice.actions;

export default processSlice.reducer;
