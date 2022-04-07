import { addUserStart, addUserSuccess, addUserFailure } from "../reducers/user";
import { authSuccess } from "../reducers/auth";
import * as api from "../api";

// action creator for signup
export const signup = (newUser, navigate) => async (dispatch) => {
  try {
    dispatch(addUserStart());

    const { data } = await api.addUser(newUser);

    dispatch(addUserSuccess(data));
    dispatch(authSuccess(data));

    navigate("/home");
  } catch (error) {
    const { name, email, password } = error?.response?.data?.errors;

    dispatch(
      addUserFailure({
        name: name?.msg,
        email: email?.msg,
        password: password?.msg,
      })
    );
  }
};

// action creator for google signup
export const signupWithGoogle = (newUser, navigate) => async (dispatch) => {
  try {
    dispatch(addUserStart());

    const { data } = await api.signupWithGoogle(newUser);

    dispatch(addUserSuccess(data));
    dispatch(authSuccess(data));

    navigate("/home");
  } catch (error) {
    const { email, password } = error?.response?.data?.errors;

    dispatch(addUserFailure({ email: email?.msg, password: password?.msg }));
  }
};
