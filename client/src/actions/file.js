import {
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
} from "../reducers/file";
import * as api from "../api";

// action creator for upload files
export const uploadFiles = (state) => async (dispatch) => {
  try {
    dispatch(addFilesStart());

    const { data } = await api.saveFiles(state);

    dispatch(addFilesSuccess(data));
  } catch (error) {
    dispatch(addFilesFailure({ message: error?.response?.data?.message }));
  }
};

// action creator for get files
export const getFiles = () => async (dispatch) => {
  try {
    dispatch(getAllFilesStart());

    const { data } = await api.getAllFiles();

    dispatch(getAllFilesSuccess(data));
  } catch (error) {
    dispatch(getAllFilesFailure({ message: error?.response?.data?.message }));
  }
};

// action creator for edit file info
export const editFileInfo = (id, state) => async (dispatch) => {
  try {
    dispatch(editFileinfoStart());

    const { data } = await api.editFileInfo(id, state);

    dispatch(editFileinfoSuccess(data));
  } catch (error) {
    dispatch(editFileinfoFailure({ message: error?.response?.data?.message }));
  }
};

// action creator for edit file info
export const downloadFile = (publicKey, state) => async (dispatch) => {
  try {
    dispatch(downloadFileStart());

    const { data } = await api.downloadFile(publicKey, state);

    dispatch(downloadFileSuccess(data));
  } catch (error) {
    dispatch(downloadFileFailure({ message: error?.response?.data?.message }));
  }
};

// action creator for delete file
export const deleteFile = (privateKey, fileName) => async (dispatch) => {
  try {
    dispatch(deleteFileFileStart());

    const { data } = await api.deleteFile(privateKey, fileName);

    dispatch(deleteFileFileSuccess(data));
  } catch (error) {
    dispatch(
      deleteFileFileFailure({ message: error?.response?.data?.message })
    );
  }
};

// action creator for sending file
export const sendFile =
  (privateKey, { email, fileName }) =>
  async (dispatch) => {
    try {
      dispatch(sendFileStart());

      const { data } = await api.sendFile(privateKey, { email, fileName });

      dispatch(sendFileSuccess(data));
    } catch (error) {
      dispatch(sendFileFailure({ message: error?.response?.data?.message }));
    }
  };
