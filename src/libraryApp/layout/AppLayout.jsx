import { Footer, NavBar } from "../components";

export const AppLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};
