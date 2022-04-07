import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: [],
    errors: false,
  },
  reducers: {
    // add user reducer
    addUserStart: (state) => {
      state.isLoading = true;
    },
    addUserSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action?.payload;
    },
    addUserFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action?.payload;
    },
  },
});

export const { addUserStart, addUserSuccess, addUserFailure } = users.actions;

export default users.reducer;
