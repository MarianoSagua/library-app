import { FirebaseDB } from "../../firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { loadBooks, loadFavoritesBooks, loadMyBooks } from "../../helpers";
import {
  addFavoriteBook,
  addMyBook,
  deleteMyBook,
  removeFavoriteBook,
  setBooks,
  setFavoritesBooks,
  setLoading,
  setMyBooks,
  updateMyBook,
} from "./librarySlice";

export const startLoadingBooks = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    dispatch(setLoading());
    const books = await loadBooks();
    dispatch(setBooks(books));
  };
};

export const startAddingFavorites = (book) => {
  return async (dispatch, getState) => {
    const { uid, displayName } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const collectionRef = collection(
      FirebaseDB,
      `/library-users/${displayName}/Favorites`
    );
    const newDoc = doc(collectionRef);
    await setDoc(newDoc, book);

    dispatch(addFavoriteBook(book));
  };
};

export const startRemovingFavorites = (book) => {
  return async (dispatch, getState) => {
    const { uid, displayName } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const collectionRef = collection(
      FirebaseDB,
      `/library-users/${displayName}/Favorites`
    );

    const docRef = doc(collectionRef);

    await deleteDoc(docRef);
    dispatch(removeFavoriteBook(book));
  };
};

export const startLoadingFavoritesBooks = () => {
  return async (dispatch, getState) => {
    const { uid, displayName } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    dispatch(setLoading());
    const favorites_books = await loadFavoritesBooks({ displayName });
    dispatch(setFavoritesBooks(favorites_books));
  };
};

export const startAddingMyBook = (book) => {
  return async (dispatch, getState) => {
    const { uid, displayName } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const collectionRef = collection(
      FirebaseDB,
      `/library-users/${displayName}/MyBooks`
    );

    const newDoc = doc(collectionRef);
    await setDoc(newDoc, book);

    dispatch(addMyBook(book));
  };
};

export const startLoadingMyBooks = () => {
  return async (dispatch, getState) => {
    const { uid, displayName } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    dispatch(setLoading());
    const myBooks = await loadMyBooks({ displayName });
    dispatch(setMyBooks(myBooks));
  };
};

export const startUpdateMyBook = (book) => {
  return async (dispatch, getState) => {
    const { uid, displayName } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const myBookUpdated = { ...book };
    delete myBookUpdated.id;

    const docRef = doc(
      FirebaseDB,
      `/library-users/${displayName}/MyBooks/${book.id}`
    );

    await updateDoc(docRef, myBookUpdated, { merge: true });
    dispatch(updateMyBook(book));
  };
};

export const startDeleteMyBook = (id) => {
  return async (dispatch, getState) => {
    const { uid, displayName } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const docRef = doc(FirebaseDB, `/library-users/${displayName}/MyBooks/${id}`);

    await deleteDoc(docRef);
    dispatch(deleteMyBook(id));
  };
};
