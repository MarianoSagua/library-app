import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startSignIn } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  const { errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(startSignIn(data));
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            margin: "0 auto",
            marginBottom: "20px",
          }}
        >
          <label className="form-label" style={{ width: "100%" }}>
            Your Email
          </label>
          <input
            type="email"
            placeholder="Your email"
            {...register("email", { required: true })}
            style={{ width: "100%" }}
            className="form-control"
          />

          {errors?.email?.type === "required" && (
            <div className="alert alert-danger mt-2 " role="alert">
              This field is required.
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            marginBottom: "20px",
          }}
        >
          <label className="form-label" style={{ width: "100%" }}>
            Your Password
          </label>
          <input
            type="password"
            placeholder="Your password"
            {...register("password", { required: true, minLength: 6 })}
            style={{ width: "100%" }}
            className="form-control"
          />

          {errors?.pasword?.type === "required" && (
            <div className="alert alert-danger mt-2 " role="alert">
              This field is required.
            </div>
          )}
          {errors?.password?.type === "minLength" && (
            <div className="alert alert-danger mt-2 " role="alert">
              The password must be at least 6 characters.
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "10px",
            }}
          >
            <Link className="linksAuth" to="/auth/restore-password">
              Forgot Password?
            </Link>
          </div>
        </div>

        <div>
          <div>
            {errorMessage === "Error - login" && (
              <p>Email or password are incorrect, Try Again!</p>
            )}
          </div>

          <div>
            <button
              className="btn btn-dark"
              style={{
                width: "100%",
                borderRadius: "20px",
                marginTop: "20px",
                marginBottom: "15px",
              }}
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </div>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link className="linksAuth" to="/auth/register">
          Or Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
};
