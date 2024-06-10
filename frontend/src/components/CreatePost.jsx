import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";

const CreatePost = () => {
  const { setPosts } = useContext(UserContext);

  
  const [post, setPost] = useState({
    media: "./src/assets/addImage.png",
    heading: "My first Post",
    description: "Hello everyone, like this post",
  });
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const render = new FileReader();

    render.onload = () => {
      setPost({ ...post, media: render.result });
    };

    if (file) {
      render.readAsDataURL(file);
    }
  };

  const handleTextChange = (event) => {
    event.target.style.height = "inherit";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Send button clicked");
    const id = Math.floor(Math.random() * 1000000000);

    //Adding the post to the frontend
    setPost({
      ...post,
      id: id,
      heading: event.target[2].value,
      description: event.target[3].value,
    });
    setPosts((prevPosts) => [...prevPosts, post]);
    console.log(post);

    // Adding the post to the backend
    axios
      .post("/api/posts/createPost", post)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error adding post: ${error}`);
      });

    // Clearing the input fields
    event.target[2].value = "";
    event.target[3].value = "";
    setPost({
      media: "./src/assets/addImage.png",
    });
  };

  return (
    <PostWrapper>
      <form onSubmit={onSubmit}>
        <UserInfo>
          <UserData>
            <UserProfile src="./src\assets\discussion.jpg" />
            <UserName>Cillian Murphy</UserName>
          </UserData>
          <button type="submit">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </UserInfo>

        <PostMedia>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
          />
          <img src={post.media} alt="image link broken" />
        </PostMedia>

        <PostDetails>
          <textarea
            className="heading"
            type="text"
            placeholder="Edit Heading..."
            onChange={handleTextChange}
          />
          <textarea
            className="para"
            type="text"
            placeholder="Edit Description..."
            onChange={handleTextChange}
          />
        </PostDetails>
      </form>
    </PostWrapper>
  );
};

export default CreatePost;

const PostWrapper = styled.div`
  width: 80%;
  min-height: 550px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  /* background-color: #afdaaf; */
  button {
    border: none;
  }
  i {
    font-size: 1.5rem;
    color: #333;
    cursor: pointer;
  }
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const UserProfile = styled.img`
  width: 45px;
  border-radius: 50%;
`;

const UserName = styled.div``;

const PostMedia = styled.div`
  flex: 1;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  /* height: 300px; */
  background-color: #9a9a9a;
  input {
    position: absolute;
    height: 70%;
    /* width: 55%; */
    opacity: 0;
    border-radius: 50%;
    /* background-color: #ffb5b5; */
  }
  img {
    object-fit: cover;
    width: 100%;
  }
`;

// const PostInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 10px 30px;
//   /* background-color: #afdaaf; */
//   button {
//     font-size: 1.5rem;
//     background-color: transparent;
//     border: none;
//     cursor: pointer;
//   }
// `;

const PostDetails = styled.div`
  margin: 5px 15px;
  display: flex;
  flex-direction: column;

  .heading {
    font-family: "DM Sans";
    border: none;
    outline: none;
    color: #333333;
    font-size: 2rem;
    resize: none;
    width: 100%;
    /* height: 3rem; */
    margin-top: 10px;
    /* overflow: visible; */
    /* white-space: pre-wrap; */
    /* overflow: hidden; */
    /* i want to go to the next line if it completed */
    ::placeholder {
      color: #999;
    }
  }
  .para {
    font-family: "DM Sans";
    border: none;
    outline: none;
    font-size: 1.2rem;
    margin-top: 15px;
    color: #676767;
    resize: none;
    margin-bottom: 20px;
    ::placeholder {
      color: #bbb;
    }
  }
`;
