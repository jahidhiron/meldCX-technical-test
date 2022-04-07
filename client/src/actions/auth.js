import * as api from "../api";
import {
  authStart,
  authSuccess,
  authFailure,
  logoutSuccess,
} from "../reducers/auth";

// action creator for login
export const login = (userCredential, navigate) => async (dispatch) => {
  try {
    dispatch(authStart());

    const { data } = await api.login(userCredential);

    dispatch(authSuccess(data));

    navigate("/home");
  } catch (error) {
    const { message } = error?.response?.data;

    dispatch(authFailure({ email: message }));
  }
};

// action creator for logout
export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch(logoutSuccess());

    navigate("/");
  } catch (error) {
    dispatch(authFailure(error?.response?.data));
  }
};
