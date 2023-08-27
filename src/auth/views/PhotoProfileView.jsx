import { useEffect, useState } from "react";
import { fileUpload } from "../../helpers/fileUploadProfile";
import { setPhotoURL } from "../../store/auth";
import { useDispatch } from "react-redux";
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

export const PhotoProfileView = ({ register, watch }) => {
  const [imageProfile, setImageProfile] = useState("");
  const dispatch = useDispatch();

  const files = watch("photoURl");

  const onAddImageProfile = async () => {
    if (files?.length !== undefined && files?.length !== 0) {
      const resp = await fileUpload(files[0], "Library-App-Profile-Picture");
      setImageProfile(resp.url);
      dispatch(setPhotoURL(resp.url));
    }
  };

  useEffect(() => {
    onAddImageProfile();
  }, [files]);

  return (
    <div className="mb-3">
      <h6 style={{ textAlign: "center" }}>Upload your profile picture:</h6>

      <div>
        <input
          type="file"
          {...register("photoURl")}
          style={{
            display: "none",
          }}
          id="fileInput"
        />

        <label
          onClick={onAddImageProfile}
          htmlFor="fileInput"
          className="uploadIconButton"
          style={imageProfile !== "" ? { display: "none" } : {}}
        >
          {arrowUp}
        </label>

        <div style={imageProfile !== "" ? {} : { display: "none" }}>
          <img
            src={imageProfile}
            alt="Uploaded Img"
            className="uploadedImage"
          />

          <label
            style={{ cursor: "pointer" }}
            htmlFor="fileInput"
            onClick={onAddImageProfile}
          >
            Change
          </label>
        </div>
      </div>
    </div>
  );
};
