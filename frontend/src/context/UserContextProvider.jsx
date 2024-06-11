import React, { useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {

  const [posts, setPosts] = useState([
    {
      id: "32432433543sdff",
      media: "./src/assets/post1.jpg",
      heading: "My first Post",
      description: "Hello everyone, like this post",
    },
  ]);



  axios
    .get("/api/posts")
    .then((response) => {
      setPosts(response);
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    });




  return (
    <UserContext.Provider value={{ posts, setPosts }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
