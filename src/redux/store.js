import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import formReducer from "./slices/formSlice";
import dbRetrievalReducer from "./slices/dbRetrievalSlice";
import fieldReducer from "./slices/fieldSlice";
import processReducer from "./slices/processSlice";
import roleReducer from "./slices/roleSlice";
import permissionReducer from "./slices/permissionSlice";
import groupReducer from "./slices/groupSlice";
import fieldLocationReducer from "./slices/fieldLocationSlice";
import fieldListValueReducer from "./slices/fieldListValueSlice";
import datalistReducer from "./slices/datalistSlice";
import datalistFilterReducer from "./slices/datalistFilterSlice";
import datalistColumnReducer from "./slices/datalistColumnSlice";
import datalistActionReducer from "./slices/datalistActionSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    form: formReducer,
    dbRetrieval: dbRetrievalReducer,
    field: fieldReducer,
    process: processReducer,
    role: roleReducer,
    permission: permissionReducer,
    group: groupReducer,
    fieldLocation: fieldLocationReducer,
    fieldListValue: fieldListValueReducer,
    datalist: datalistReducer,
    datalistFilter: datalistFilterReducer,
    datalistColumn: datalistColumnReducer,
    datalistAction: datalistActionReducer,
  },
});
