import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { startLogOut } from "../../store/auth/thunks";
const logOutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    className="bi bi-box-arrow-right"
    viewBox="0 0 16 16"
    style={{ color: "red" }}
  >
    <path
      fill-rule="evenodd"
      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
    />
    <path
      fill-rule="evenodd"
      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
    />
  </svg>
);

export const NavBar = () => {
  // const { favorites_books } = useSelector((state) => state.library);
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Library
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/all-books"}>
                All Books
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to={"/favorites"}>
                Favorites
                <span style={{ color: "red", marginLeft: "5px" }}>
                  {favorites_books?.length}
                </span>
              </NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink className="nav-link" to={"/my-books"}>
                My Books
              </NavLink>
            </li>

            <li
              className="nav-item"
              style={{ cursor: "pointer", marginLeft: "10px" }}
              onClick={() => dispatch(startLogOut())}
            >
              {" "}
              <span>{logOutIcon}</span>{" "}
            </li>

            <li
              className="nav-item"
              style={{
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={photoURL}
                alt="Logo"
                width="35"
                height="35"
                className="d-inline-block align-text-top"
                style={{ marginRight: "5px", borderRadius: "50%" }}
              />
              {displayName}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
