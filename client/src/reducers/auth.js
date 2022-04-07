import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    authData: null,
    isLoading: false,
    errors: false,
  },
  reducers: {
    // authentication reducer
    authStart: (state) => {
      state.isLoading = true;
    },
    authSuccess: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.isLoading = false;
      state.authData = action?.payload;
    },
    authFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action?.payload;
    },

    // logout reducer
    logoutSuccess: (state) => {
      localStorage.clear();
      state.authData = null;
    },
  },
});

export const { authStart, authSuccess, authFailure, logoutSuccess } =
  auth.actions;

export default auth.reducer;
