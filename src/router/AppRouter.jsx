import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { LibraryRoutes } from "../libraryApp/routes/LibraryRoutes";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { LoaderAuth } from "../ui";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);

  useCheckAuth();

  if (status === "checking") {
    return <LoaderAuth type={"Full"} />;
  }

  return (
    <Routes>
      {status === "auth" ? (
        <Route path="/*" element={<LibraryRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
