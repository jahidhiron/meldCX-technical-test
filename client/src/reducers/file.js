import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
  name: "files",
  initialState: {
    isLoading: false,
    data: [
      {
        title: "",
        desc: "",
        files: [],
        folder: "",
        publicKey: "",
        privateKey: "",
      },
    ],
    errors: false,
  },
  reducers: {
    // add files reducers
    addFilesStart: (state) => {
      state.isLoading = true;
    },
    addFilesSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
    },
    addFilesFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action?.payload;
    },

    // get files reducers
    getAllFilesStart: (state) => {
      state.isLoading = true;
    },
    getAllFilesSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
    },
    getAllFilesFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action?.payload;
    },

    // edit file info reducers
    editFileinfoStart: (state) => {
      state.isLoading = true;
    },
    editFileinfoSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
    },
    editFileinfoFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action?.payload;
    },

    // download file reducers
    downloadFileStart: (state) => {
      state.isLoading = true;
    },
    downloadFileSuccess: (state, action) => {
      state.isLoading = false;
      state.fileName = action?.payload;
    },
    downloadFileFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action?.payload;
    },

    // delete file reducers
    deleteFileFileStart: (state) => {
      state.isLoading = true;
    },
    deleteFileFileSuccess: (state, action) => {
      state.isLoading = false;
      state.fileName = action?.payload;
    },
    deleteFileFileFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action?.payload;
    },

    // delete file reducers
    sendFileStart: (state) => {
      state.isLoading = true;
    },
    sendFileSuccess: (state, action) => {
      state.isLoading = false;
      state.file = action?.payload;
    },
    sendFileFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action?.payload;
    },
  },
});

export const {
  addFilesStart,
  addFilesSuccess,
  addFilesFailure,
  getAllFilesStart,
  getAllFilesSuccess,
  getAllFilesFailure,
  editFileinfoStart,
  editFileinfoSuccess,
  editFileinfoFailure,
  downloadFileStart,
  downloadFileSuccess,
  downloadFileFailure,
  deleteFileFileStart,
  deleteFileFileSuccess,
  deleteFileFileFailure,
  sendFileStart,
  sendFileSuccess,
  sendFileFailure,
} = users.actions;

export default users.reducer;
