import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth, createUserWithEmailAndPassword } from "./config";

export const registerUser = async ({
  email,
  password,
  displayName,
  photoURL,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    });

    return {
      ok: true,
      uid,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Error - registro",
    };
  }
};

export const logOutUser = async () => {
  return await FirebaseAuth.signOut();
};

export const signInUser = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Error - login",
    };
  }
};

export const restorePassword = async (email) => {
  try {
    await sendPasswordResetEmail(FirebaseAuth, email);

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Error - restore password",
    };
  }
};


