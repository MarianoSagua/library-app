import FondoLogin from "../images/fondoLogin.jpg";

export const LoaderAuth = ({ type = "" }) => {
  return (
    <div
      className="d-flex justify-content-center text-primary"
      style={{
        height: "100vh",
        alignItems: "center",
        backgroundImage: `url(${FondoLogin})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
      }}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
