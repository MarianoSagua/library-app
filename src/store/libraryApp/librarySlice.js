import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  books: [],
  favorites_books: [],
  myBooks: [],
  isLoading: false,
};

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setBooks: (state, { payload }) => {
      state.books = payload;
      state.isLoading = false;
    },
    addFavoriteBook: (state, { payload }) => {
      state.favorites_books.push(payload);
    },
    removeFavoriteBook: (state, { payload }) => {
      state.favorites_books = state.favorites_books.filter(
        (book) => book.id !== payload.id
      );
    },
    setFavoritesBooks: (state, { payload }) => {
      state.favorites_books = payload;
      state.isLoading = false;
    },
    addMyBook: (state, { payload }) => {
      state.myBooks.push(payload);
    },
    removeMyBook: (state, { payload }) => {
      state.myBooks = state.myBooks.filter((book) => book.id !== payload.id);
    },
    setMyBooks: (state, { payload }) => {
      state.myBooks = payload;
      state.isLoading = false;
    },
    updateMyBook: (state, { payload }) => {
      state.isSaving = false;
      state.myBooks = state.myBooks.map((book) => {
        if (book.id === payload.id) {
          return payload;
        }
        return book;
      });
    },
    deleteMyBook: (state, { payload }) => {
      state.myBooks = state.myBooks.filter((note) => note.id !== payload);
    },
  },
});

export const {
  setBooks,
  setLoading,
  addFavoriteBook,
  removeFavoriteBook,
  setFavoritesBooks,
  addMyBook,
  setMyBooks,
  updateMyBook,
  deleteMyBook,
} = librarySlice.actions;
