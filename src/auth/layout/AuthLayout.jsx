import FondoLogin from "../images/fondoLogin.jpg";

export const AuthLayout = ({ children, title }) => {
  return (
    <div
      className="loginPage"
      style={{
        backgroundImage: `url(${FondoLogin})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
      }}
    >
      <div className="loginPage__container shadow-lg">
        <h1 className="loginPage__container--title">{title}</h1>

        {children}
      </div>
    </div>
  );
};
