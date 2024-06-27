import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./context/UserContextProvider.jsx";
import Routers from "./components/Routers.jsx";
import ScrollContextProvider from "./context/ScrollContextProvider.jsx";
import SessionContextProvider from "./context/SessionContextProvider.jsx";
import { FarmerProvider } from "./context/FarmerContext.jsx";
import { SocketContextProvider } from "./context/SocketContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode
  <SessionContextProvider>
    <ScrollContextProvider>
      <UserContextProvider>
        <FarmerProvider>
          <SocketContextProvider>
            {/* <App /> */}
            <Routers />
          </SocketContextProvider>
        </FarmerProvider>
      </UserContextProvider>
    </ScrollContextProvider>
  </SessionContextProvider>
  // </React.StrictMode>,
);
