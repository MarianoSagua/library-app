import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startRestorePassword } from "../../store/auth/thunks";
import { logout } from "../../store/auth/authSlice";
import { AuthLayout } from "../layout/AuthLayout";

export const ResetPasswordPage = () => {
  const { errorMessage, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("email-restore-password", data.email);
    dispatch(startRestorePassword(data));
  };

  const onResetRestore = () => {
    reset();
    dispatch(logout());
  };

  return (
    <AuthLayout title="Restoring Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        {status !== "restoring password" && (
          <>
            <label className="form-label">Enter your email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="form-control"
            />
            {errors?.email?.type === "required" && (
              <div className="alert alert-danger mt-2 " role="alert">
                This fiel is required.
              </div>
            )}
            <p
              style={{ marginBottom: "20px", color: "grey", fontSize: "14px" }}
            >
              We will send you an email to restore you password.
            </p>
          </>
        )}

        <div>
          <div>
            {errorMessage === "Error - restore password" && (
              <div className="alert alert-danger mt-2 " role="alert">
                No account matches the email entered. Try Again!
              </div>
            )}
          </div>

          <div>
            {status === "restoring password" && (
              <>
                <div
                  className="alert alert-success"
                  role="alert"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Email sent to {localStorage.getItem("email-restore-password")}
                  , check it !{" "}
                  <span
                    onClick={onResetRestore}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Try with another email
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ marginBottom: "15px", marginTop: "40px" }}>
          <button
            className="btn btn-dark"
            style={{ width: "100%", borderRadius: "20px" }}
            type="submit"
          >
            SEND
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
        <Link className="linksAuth" to={"/auth/login"}>
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
};
