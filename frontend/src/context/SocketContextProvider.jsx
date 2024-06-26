import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { SocketContext } from "./Contexts";

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket = io("http://localhost:3000");
    const newSocket = io(`http://${import.meta.env.VITE_IP}:3000`);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
