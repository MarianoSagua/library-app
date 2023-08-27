import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { startRegister } from "../../store/auth/thunks";
import { PhotoProfileView } from "../views/PhotoProfileView";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  const { photoURL } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const dataToSend = { ...data, photoURL: photoURL };
    dispatch(startRegister(dataToSend));
    reset();
  };

  return (
    <AuthLayout title="Register">
      <form
        className="row"
        style={{ textAlign: "center" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-6">
          <div className="mb-3">
            <label className="form-label">Your name and lastname:</label>
            <input
              {...register("displayName", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              type="text"
              placeholder="Your name and lastname"
              className="form-control"
              style={{ textAlign: "center" }}
            />
            {errors?.displayName?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors?.displayName?.type === "pattern" && (
              <p style={{ color: "red" }}>Only letters, no numbers</p>
            )}
          </div>

          <PhotoProfileView register={register} watch={watch} />
        </div>

        <div className="col-6">
          <div className="mb-3">
            <label className="form-label">Enter your email:</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your email"
              className="form-control"
              style={{ textAlign: "center" }}
            />
            {errors?.email?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Create your password:</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="Create your password"
              className="form-control"
              style={{ textAlign: "center" }}
            />
            {errors?.password?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors?.password?.type === "minLength" && (
              <p style={{ color: "red" }}>No more than 6 caracthers!</p>
            )}
          </div>
        </div>

        <div
          className="mb-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <button
            className="btn btn-dark"
            style={{ width: "100%", borderRadius: "20px" }}
            type="submit"
          >
            REGISTER
          </button>
        </div>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          className="linksAuth"
          style={{ marginLeft: "5px" }}
          to={"/auth/login"}
        >
          Or Sign In
        </Link>{" "}
      </div>
    </AuthLayout>
  );
};
