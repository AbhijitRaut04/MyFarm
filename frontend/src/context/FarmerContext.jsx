// src/FarmerContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FarmerContext = createContext();

export const useFarmer = () => useContext(FarmerContext);

export const FarmerProvider = ({ children }) => {
  const [farmerId, setFarmerId] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await axios.get("/api/verify");
      setFarmerId(response.data.farmer.userId);
    } catch (error) {
      console.error("Error verifying token:", error);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <FarmerContext.Provider value={{ farmerId, loading }}>
      {children}
    </FarmerContext.Provider>
  );
};
