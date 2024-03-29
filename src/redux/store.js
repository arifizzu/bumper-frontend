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
  },
});
