import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { AllBooks, BookPage, FavoritesPage, MyBooksPage } from "../pages";

export const LibraryRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
        <Route path="/my-books" element={<MyBooksPage />} />

        <Route path="/*" element={<Navigate to={"/all-books"} />} />
      </Routes>
    </AppLayout>
  );
};
