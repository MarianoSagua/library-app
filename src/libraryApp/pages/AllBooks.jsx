import { useSelector } from "react-redux";
import { ItemBook } from "../components/ItemBook";

export const AllBooks = () => {
  const { books } = useSelector((state) => state.library);

  return (
    <div
      className="container-lg row mt-5 mb-5"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      {books.map((book) => {
        return <ItemBook key={book.id} {...book} />;
      })}
    </div>
  );
};
