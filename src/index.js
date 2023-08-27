import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.scss";
import { LibraryApp } from "./LibraryApp";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <LibraryApp />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
