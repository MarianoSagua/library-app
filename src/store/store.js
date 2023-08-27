import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { librarySlice } from "./libraryApp/librarySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    library: librarySlice.reducer,
  },
});
