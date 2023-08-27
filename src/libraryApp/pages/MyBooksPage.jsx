import { useDispatch, useSelector } from "react-redux";
import { startAddingMyBook } from "../../store/libraryApp/thunks";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fileUpload } from "../../helpers/fileUploadProfile";
import { MyBookList } from "../components/MyBookList";
import { NoMyBooksView } from "../views";

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

export const MyBooksPage = () => {
  const dispatch = useDispatch();
  const [imageCover, setImageCover] = useState("");
  const { myBooks } = useSelector((state) => state.library);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const dataToSend = { ...data, myBookCover: imageCover, date: new Date() };
    dispatch(startAddingMyBook(dataToSend));
    reset();
    setImageCover("");
  };

  const files = watch("myBookCover");

  const onAddCover = async () => {
    if (files?.length !== undefined && files?.length !== 0) {
      const resp = await fileUpload(files[0], "Library-App-Profile-Picture");
      setImageCover(resp.url);
    }
  };

  useEffect(() => {
    onAddCover();
  }, [files]);

  return (
    <>
      <div className="container mt-5">
        <div className="bookToAdd shadow">
          {" "}
          <button
            type="button"
            style={{ cursor: "pointer", border: "none", background: "none" }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            {plusIcon}
          </button>
        </div>

        {myBooks?.length > 0 ? <MyBookList /> : <NoMyBooksView />}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add your book
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => reset()}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Book Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("myBookName", { required: true })}
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

                    <label
                      onClick={onAddCover}
                      htmlFor="fileInput"
                      className="coverAddMyBook"
                      style={imageCover !== "" ? { display: "none" } : {}}
                    >
                      {arrowUp}
                    </label>
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
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => reset()}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-dark">
                  Add Book
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
