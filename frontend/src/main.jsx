import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./context/UserContextProvider.jsx";
import Routers from "./components/Routers.jsx";
import ScrollContextProvider from "./context/ScrollContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ScrollContextProvider>
    <UserContextProvider>
      {/* <App /> */}
      <Routers />
    </UserContextProvider>
  </ScrollContextProvider>
  // </React.StrictMode>,
);
