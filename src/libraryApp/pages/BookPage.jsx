import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { LoaderAuth } from "../../ui/components/LoaderAuth";
import {
  startAddingFavorites,
  startRemovingFavorites,
} from "../../store/libraryApp/thunks";

const emptyHeart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    className="bi bi-heart"
    viewBox="0 0 16 16"
  >
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
  </svg>
);
const fillHeart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    className="bi bi-heart-fill"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
    />
  </svg>
);

export const BookPage = () => {
  const { id } = useParams();
  const { books, isLoading } = useSelector((state) => state.library);
  // const [heart, setHeart] = useState();
  // const [favoriteState, setFavoriteState] = useState();
  const dispatch = useDispatch();

  if (isLoading) {
    return <LoaderAuth />;
  }

  const book = books.find((book) => book.id === id);

  if (!book) {
    return <Navigate to={"/all-books"} />;
  }

  const { author, cover, description, pages_number, publish_date, title } = book;

  // const addRemoveFavorite = () => {
  //   setHeart(!heart);

  //   if (!favoriteState) {
  //     dispatch(startAddingFavorites(book));
  //   } else {
  //     dispatch(startRemovingFavorites(book));
  //   }

  //   setFavoriteState(!favoriteState);
  // };

  return (
    <div className="bookPage">
      <div className="card mb-3" style={{ maxWidth: "840px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={cover} className="img-fluid rounded-start" alt={title} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3
                className="card-title"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {title}{" "}
                {/* <span onClick={addRemoveFavorite} style={{ cursor: "pointer" }}>
                  {heart ? fillHeart : emptyHeart}
                </span>{" "} */}
              </h3>
              <h5 className="card-title">{author}</h5>
              <p className="card-text">
                <small className="text-body-secondary">
                  {publish_date} || {pages_number} Pages
                </small>
              </p>
              <p className="card-text">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
