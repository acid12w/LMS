import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import AuthSlice from "./Auth-slice";
import { apiSlice } from "../api/ApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: AuthSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store;
