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

  const [refresh, setRefresh] = useState(false);

  const [showLoginMessage, setShowLoginMessage] = useState(false);

  // console.log(posts);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
        setRefresh((prev) => !prev);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [refresh]);

  return (
    <UserContext.Provider
      value={{ posts, setPosts, setRefresh, showLoginMessage, setShowLoginMessage }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
