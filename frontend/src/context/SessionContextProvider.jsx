import React, { useEffect, useState } from "react";
import { SessionContext, UserContext } from "./Contexts";
import axios from "axios";

const SessionContextProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(null);
  useEffect(() => {
    axios
      .get("api/farmers/profile")
      .then((response) => {
        setFarmer(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <SessionContext.Provider value={{ farmer }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
