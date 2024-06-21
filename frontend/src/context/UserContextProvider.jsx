import React, { createContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

// const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      title: "This is my post 1 title",
      content: "Hello everyone, like this post",
      file: "./src/assets/post1.jpg",
      createdBy: "",
      likes: [],
      comments: [],
      createdAt: {},
      isPublic: true,
    },
  ]);

  console.log(posts);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [isScrolledPast, setIsScrolledPast] = useState(false);

  return (
    <UserContext.Provider
      value={{ posts, setPosts, isScrolledPast, setIsScrolledPast }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
