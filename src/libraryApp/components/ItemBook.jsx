import { Link } from "react-router-dom";

const shortenText = (text) => {
  if (text.length <= 50) {
    return text;
  } else {
    return text.slice(0, 50) + "...";
  }
};

export const ItemBook = ({ title, description, cover, id }) => {
  return (
    <div
      className="card m-3"
      style={{
        width: "18rem",
        height: "40rem",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img src={cover} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{shortenText(description)}</p>
        <Link to={`/book/${id}`} className="btn btn-dark">
          More
        </Link>
      </div>
    </div>
  );
};
