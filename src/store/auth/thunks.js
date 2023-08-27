import {
  logOutUser,
  registerUser,
  restorePassword,
  signInUser,
} from "../../firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
  setResetPassword,
} from "./authSlice";

export const startRegister = ({ email, password, displayName, photoURL }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, errorMessage, uid } = await registerUser({
      email,
      password,
      displayName,
      photoURL,
    });

    if (!ok) return dispatch(logout(errorMessage));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    await logOutUser();

    dispatch(logout());
  };
};

export const startSignIn = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { uid, displayName, photoURL, errorMessage, ok } = await signInUser({
      email,
      password,
    });

    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, photoURL, email }));
  };
};

export const startRestorePassword = ({ email }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, errorMessage } = await restorePassword(email);

    if (!ok) return dispatch(logout({ errorMessage: errorMessage }));

    dispatch(setResetPassword());
  };
};
