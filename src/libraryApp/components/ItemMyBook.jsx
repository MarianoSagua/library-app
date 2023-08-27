import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconoMyBook from "../images/iconoMyBook.png";
import { fileUpload } from "../../helpers";
import { useDispatch } from "react-redux";
import {
  startDeleteMyBook,
  startUpdateMyBook,
} from "../../store/libraryApp/thunks";

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    fill="currentColor"
    className="bi bi-plus-circle-fill"
    viewBox="0 0 16 16"
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
  </svg>
);
const arrowUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    className="bi bi-arrow-bar-up"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);

export const ItemMyBook = ({ book }) => {
  const {
    myBookCover = "",
    myBookName,
    myBookAuthor,
    myBookDescription,
    myBookPublishDate,
    myBookPagesNumber,
    id,
  } = book;

  const dispatch = useDispatch();
  const [imageCover, setImageCover] = useState(myBookCover);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const dataToSend = { ...data, myBookCover: imageCover, id: id };
    dispatch(startUpdateMyBook(dataToSend));
  };

  const files = watch("myBookCover");

  const onAddCover = async () => {
    if (files?.length !== undefined && files?.length !== 0) {
      const resp = await fileUpload(files[0], "Library-App-Profile-Picture");
      setImageCover(resp.url);
    }
  };

  const onDeleteMyBook = () => {
    dispatch(startDeleteMyBook(id));
  };

  useEffect(() => {
    onAddCover();
  }, [files]);

  return (
    <>
      <div
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
        className="container col-4 m-2"
        style={{ cursor: "pointer" }}
      >
        <img
          className="imgCover"
          src={myBookCover === "" ? IconoMyBook : myBookCover}
          alt="Img book cover"
        />
      </div>

      <div
        className="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update Your Book
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Book Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("myBookName", { required: true })}
                    defaultValue={myBookName}
                  />
                  {errors?.myBookName?.type === "required" && (
                    <div className="alert alert-danger mt-2 " role="alert">
                      This field is required.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Author:</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("myBookAuthor", { required: true })}
                    defaultValue={myBookAuthor}
                  />
                  {errors?.myBookAuthor?.type === "required" && (
                    <div className="alert alert-danger mt-2 " role="alert">
                      This field is required.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Publish Date:</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("myBookPublishDate", { required: true })}
                    defaultValue={myBookPublishDate}
                  />
                  {errors?.myBookPublishDate?.type === "required" && (
                    <div className="alert alert-danger mt-2 " role="alert">
                      This field is required.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Number of Pages:</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("myBookPagesNumber", { required: true })}
                    defaultValue={myBookPagesNumber}
                  />
                  {errors?.myBookPagesNumber?.type === "required" && (
                    <div className="alert alert-danger mt-2 " role="alert">
                      This field is required.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    {...register("myBookDescription", { required: true })}
                    defaultValue={myBookDescription}
                  />
                  {errors?.myBookDescription?.type === "required" && (
                    <div className="alert alert-danger mt-2 " role="alert">
                      This field is required.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Cover:</label>

                  <div className="mt-3">
                    <input
                      type="file"
                      {...register("myBookCover")}
                      style={{
                        display: "none",
                      }}
                      id="fileInput"
                    />
                  </div>

                  <div
                    style={
                      imageCover !== ""
                        ? {
                            display: "inline-block",
                            textAlign: "center",
                          }
                        : { display: "none" }
                    }
                  >
                    <img
                      src={imageCover}
                      alt="Uploaded Img"
                      className="coverAddMyBook"
                    />

                    <label
                      htmlFor="fileInput"
                      onClick={onAddCover}
                      className="labelChangeImgAddBook"
                    >
                      Change
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={onDeleteMyBook}
                >
                  Delete this book
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-dark">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
