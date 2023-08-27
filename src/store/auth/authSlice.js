import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = "auth";
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-auth";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    setPhotoURL: (state, { payload }) => {
      state.photoURL = payload;
    },
    setResetPassword: (state) => {
      state.errorMessage = null;
      state.status = "restoring password";
    },
  },
});

export const {
  login,
  logout,
  checkingCredentials,
  setPhotoURL,
  setResetPassword,
} = authSlice.actions;
