import React, { memo, useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";

const Post = memo(({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(post.likes?.length || 0);
  const [noOfComments, setNoOfComments] = useState(post.comments?.length || 0);
  const { farmer } = useContext(SessionContext);
  // console.log(post.likes?.length);

  useEffect(() => {
    if (post) {
      setIsLiked(post.likes?.includes(farmer?._id) || false);
      setIsBookmarked(post.saved?.includes(farmer?._id) || false);
      setNoOfLikes(post.likes?.length || 0);
      setNoOfComments(post.comments?.length || 0);
      console.log("Post: ", post?.saved);
    }
  }, [post, farmer]);

  const handleLikeClick = () => {
    console.log("Like button clicked");
    console.log(post._id);
    if (!isLiked) {
      axios
        .patch(`/api/posts/${post._id}/like`)
        .then((response) => {
          setIsLiked(true);
          console.log("Post liked successfully: ", response);
          setNoOfLikes((prevLikes) => prevLikes + 1);
        })
        .catch((error) => {
          console.error("Error liking post(unknown): ", error.response);
        });
    } else {
      setIsLiked(false);
      axios
        .patch(`/api/posts/${post._id}/unlike`)
        .then((response) => {
          console.log("Post unliked successfully: ", response);
          setNoOfLikes((prevLikes) => prevLikes - 1);
        })
        .catch((error) => {
          console.error("Error unliking post(unknown): ", error.response);
        });
    }
  };

  const handleCommentClick = () => {
    console.log("Comment button clicked");
    // Add your functionality here
  };

  // const handleEditClick = () => {
  //   console.log("Edit button clicked");
  //   // Add your functionality here
  // };

  const handleBookmarkClick = () => {
    console.log("Bookmark button clicked");
    console.log(post._id);
    if (!isBookmarked) {
      axios
        .patch(`/api/posts/${post._id}/save`)
        .then((response) => {
          setIsBookmarked(true);
          console.log("Post Bookmark successfully: ", response);
        })
        .catch((error) => {
          console.error("Error Bookmarking post(unknown): ", error.response);
        });
    } else {
      setIsBookmarked(false);
      axios
        .patch(`/api/posts/${post._id}/unsave`)
        .then((response) => {
          console.log("Post unmark successfully: ", response);
        })
        .catch((error) => {
          console.error("Error unmarking post(unknown): ", error.response);
        });
    }
  };

  // const handleDeleteClick = () => {
  //   console.log("Delete button clicked");
  //   //deleting the post from the backend
  //   axios
  //     .delete(`/api/posts/${post.id}`)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(`Error deleting post: ${error}`);
  //     });
  //   //deleting the post from the frontend
  //   setPosts((prevPosts) => {
  //     return prevPosts.filter((item) => item.id !== post.id);
  //   });
  // };

  return (
    <PostWrapper>
      <UserInfo>
        <UserData>
          <UserProfile src={post.createdBy.profilePhoto} />
          <UserName>{post.createdBy.username}</UserName>
        </UserData>
        <i className="fa-solid fa-ellipsis"></i>
      </UserInfo>

      <PostMedia>
        <img src={post.file || ""} alt="" />
      </PostMedia>

      <PostInfo>
        <button onClick={handleLikeClick}>
          {/* <i className="fa-regular fa-heart like"></i> */}
          {isLiked ? (
            <i className="fa-solid fa-heart liked"></i>
          ) : (
            <i className="fa-regular fa-heart like"></i>
          )}
        </button>

        <button onClick={handleCommentClick}>
          <i className="fa-regular fa-comment"></i>
        </button>

        <button onClick={handleBookmarkClick}>
          {isBookmarked ? (
            <i class="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
        </button>

        {/* <button onClick={handleEditClick}>
          <i className="fa-regular fa-pen-to-square"></i>
          </button> */}
        {/* <button onClick={handleDeleteClick}>
          <i className="fa-regular fa-trash-can"></i>
        </button> */}
      </PostInfo>

      <PostDetails>
        <p className="likesAndComments">{`${noOfLikes} likes, ${noOfComments} comments`}</p>
        {/* <p className="likesAndComments">{`${post.comments.length} comments`}</p> */}
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </PostDetails>
    </PostWrapper>
  );
});

export default Post;

const PostWrapper = styled.div`
  width: 80%;
  height: auto;
  margin: 0 auto;
  /* margin-top: 10px; */
  padding-bottom: 30px;
  background-color: #fff;
  /* border-radius: 10px; */
  border-top: 1px solid #ddd;
  /* border-bottom: 1px solid #ddd; */
  @media (max-width: 600px) {
    border-radius: 0;
    width: 100%;
    margin: 2rem 0;
    padding-bottom: 10px;
  }
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
  @media (max-width: 600px) {
    padding: 10px 20px;
  }
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const UserProfile = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  object-fit: center;
`;

const UserName = styled.div``;

const PostMedia = styled.div`
  flex: 1;
  min-height: 350px;
  max-height: 400px;
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
  justify-content: flex-start;
  gap: 30px;
  padding: 15px 0 10px 20px;
  /* background-color: #afdaaf; */
  button {
    font-size: 1.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .liked {
    color: #f64361;
  }
`;

const PostDetails = styled.div`
  /* margin: 5px 15px; */
  /* background-color: #f9b3b3; */
  height: auto;
  * {
    margin-left: 20px;
  }
  .likesAndComments {
    /* font-size: 1rem; */
    color: #aaa;
  }
  h2 {
    /* margin: 5px 0 10px 15px; */
    font-size: 2rem;
    margin-top: 10px;
    color: #333333;
    margin-bottom: 7px;
  }
  p {
    /* margin: 0 0 3px 15px; */
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.8rem;
    color: #818181;
  }
`;
