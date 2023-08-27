import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import {
  startLoadingBooks,
  startLoadingFavoritesBooks,
  startLoadingMyBooks,
} from "../store/libraryApp/thunks";

export const useCheckAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(startLoadingBooks());
      dispatch(startLoadingFavoritesBooks());
      dispatch(startLoadingMyBooks());
    });
  }, []);
};
