import { useSelector } from "react-redux";
import { ItemMyBook } from "./ItemMyBook";

export const MyBookList = () => {
  const { myBooks } = useSelector((state) => state.library);

  return (
    <div
      className="container mt-5 row"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {myBooks.map((book, idx) => {
        return <ItemMyBook key={idx} book={book} />;
      })}
    </div>
  );
};
