import React, { useEffect, useState } from "react";
import { SessionContext } from "./Contexts";
import axios from "axios";

const SessionContextProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(null);
  const [checkout, setCheckout] = useState(true);
  useEffect(() => {
    axios
      .get("/api/farmers/profile")
      .then((response) => {
        setFarmer(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [checkout]);

  return (
    <SessionContext.Provider value={{ farmer, setCheckout }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
