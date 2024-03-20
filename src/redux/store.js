import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import formReducer from "./slices/formSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    form: formReducer,
  },
});
