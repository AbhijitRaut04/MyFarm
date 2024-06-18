import axios from "axios";
import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";

const Post = ({post}) => {
  const { setPosts } = useContext(UserContext);

  const handleLikeClick = () => {
    console.log("Like button clicked");
    // Add your functionality here
  };

  const handleCommentClick = () => {
    console.log("Comment button clicked");
    // Add your functionality here
  };

  const handleEditClick = () => {
    console.log("Edit button clicked");
    // Add your functionality here

    //editing the post from the backend
    // axios
    //   .put(`/api/posts/${post.id}`, post)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(`Error updating post: ${error}`);
    //   });

    // //editing the post from the frontend
    // setPosts((prevPosts) =>
    //   prevPosts.map((item) => {
    //     if (item.id === post.id) {
    //       return post;
    //     }
    //     return item;
    //   })
    // );
  };

  const handleBookmarkClick = () => {
    console.log("Bookmark button clicked");
    // Add your functionality here
  };

  const handleDeleteClick = () => {
    console.log("Delete button clicked");

    //deleting the post from the backend
    axios
      .delete(`/api/posts/${post.id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error deleting post: ${error}`);
      });

    //deleting the post from the frontend
    setPosts((prevPosts) => {
      return prevPosts.filter((item) => item.id !== post.id);
    });

    // Add your functionality here
  };

  return (
    <PostWrapper>
      <UserInfo>
        <UserData>
          <UserProfile src="./src\assets\discussion.jpg" />
          <UserName>Cillian Murphy</UserName>
        </UserData>
        <i className="fa-solid fa-bars"></i>
      </UserInfo>

      <PostMedia>
        <img src={post.file} alt="" />
      </PostMedia>

      <PostInfo>
        <button onClick={handleLikeClick}>
          <i className="fa-regular fa-heart like"></i>
        </button>
        <button onClick={handleCommentClick}>
          <i className="fa-regular fa-comment"></i>
        </button>
        <button onClick={handleEditClick}>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <button onClick={handleBookmarkClick}>
          <i className="fa-regular fa-bookmark"></i>
        </button>
        <button onClick={handleDeleteClick}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </PostInfo>

      <PostDetails>
        {/* <h2>{post.heading}</h2> */}
        <p>{post.content}</p>
      </PostDetails>
    </PostWrapper>
  );
};

export default Post;

const PostWrapper = styled.div`
  width: 80%;
  height: 550px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 20px;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  /* background-color: #afdaaf; */
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

  /* height: 300px; */
  background-color: #c5c5c5;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  /* background-color: #afdaaf; */
  button {
    font-size: 1.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const PostDetails = styled.div`
  margin: 5px 15px;
  h2 {
    color: #333333;
  }
  p {
    margin-top: 5px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.8rem;
    color: #aaa;
  }
`;
