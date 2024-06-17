import React, { createContext, useState } from "react";
import UserContext from "./UserContext";

// const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const [posts, setPosts] = useState([
    {
      id: "32432433543sdff",
      media: "./src/assets/post1.jpg",
      heading: "My first Post",
      description: "Hello everyone, like this post",
    }
  ]);

  const [isScrolledPast, setIsScrolledPast] = useState(false);

  return (
    <UserContext.Provider value={{ posts, setPosts, isScrolledPast, setIsScrolledPast }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
