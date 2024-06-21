import React, { useEffect, useState } from "react";
import { UserContext } from "./Contexts";
import axios from "axios";

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

  return (
    <UserContext.Provider value={{ posts, setPosts }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
