import React, { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { SessionContext, UserContext } from "../context/Contexts";
import { toast } from "react-toastify";
import PopupContainer from "./PopupContainer";
import CommentsPopup from "./CommentsPopup";

const Post = memo(({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(post.likes?.length || 0);
  const [noOfComments, setNoOfComments] = useState(post.comments?.length || 0);
  const { farmer, setCheckout } = useContext(SessionContext);
  const { setShowLoginMessage } = useContext(UserContext);
  const [displayLikes, setDisplayLikes] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  // console.log(post.likes?.length);
  
  useEffect(() => {
    if (post && farmer) {
      setIsLiked(post.likes?.includes(farmer._id) || false);

      setIsBookmarked(farmer.saved?.includes(post?._id) || false);
      setNoOfLikes(post.likes?.length || 0);
      setNoOfComments(post.comments?.length || 0);
    }
  }, [post, farmer]);

  const navigate = useNavigate();

  const viewLikes = () => {
    setDisplayLikes((displayLikes) => !displayLikes);
  };

  const viewProfile = () => {
    navigate(`/profile/${post.createdBy._id}`);
  };

  const handleLikeClick = () => {
    if (!isLiked) {
      axios
        .patch(`/api/posts/${post._id}/like`)
        .then((response) => {
          setNoOfLikes((prevLikes) => prevLikes + 1);
          setIsLiked(true);
        })
        .catch((error) => {
          toast.info("Please login!");
        });
    } else {
      axios
        .patch(`/api/posts/${post._id}/unlike`)
        .then((response) => {
          setNoOfLikes((prevLikes) => prevLikes - 1);
          setIsLiked(false);
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        });
    }
  };

  const handleCommentClick = () => {
    console.log("Comment button clicked", post);
    setDisplayComments((displayComments) => !displayComments);
  };

  const handleBookmarkClick = () => {
    if (!isBookmarked) {
      axios
        .patch(`/api/posts/${post._id}/save`)
        .then((response) => {
          setCheckout(prev => !prev);
          toast.success("Post is Saved");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) setShowLoginMessage(true);
        });
    } else {
      axios
        .patch(`/api/posts/${post._id}/unsave`)
        .then((response) => {
          toast.info("Post unmark successfully: ", response);
          setCheckout(prev => !prev);
        })
        .catch((error) => {
          console.log("Error unmarking post(unknown): ", error.response);
        });
    }
  };

  return (
    <PostWrapper>
      <UserInfo>
        <UserData onClick={viewProfile}>
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
            <i className="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
        </button>
      </PostInfo>

      <PostDetails>
        <p
          className="no-of-likes"
          onClick={viewLikes}
        >{`${noOfLikes} likes`}</p>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </PostDetails>
      {displayLikes ? (
        <PopupContainer
          fetchRoute={`/api/posts/${post._id}/likes`}
          setDisplay={setDisplayLikes}
          type="Liked"
        />
      ) : (
        ""
      )}
      { (
        post && post._id &&
        <CommentsPopup
          fetchRoute={`/api/posts/${post._id}/comment`}
          setDisplay={setDisplayComments} displayComments={displayComments}
          type="Commented"
        />
      ) }
    </PostWrapper>
  );
});

export default Post;

const PostWrapper = styled.div`
  width: 80%;
  height: auto;
  // margin: 0 auto;
  margin: 10px auto;
  padding-bottom: 30px;
  background-color: #fff;
  border-radius: 10px;
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
  padding: 10px 15px;
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
  cursor: pointer;
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
  padding: 15px 0 0px 20px;
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
    margin-top: 5px;
    color: #333333;
    margin-bottom: 7px;
  }
  p {
    /* margin: 0 0 3px 15px; */
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.8rem;
    color: #818181;
  }
  .no-of-likes {
    cursor: pointer;
  }
`;
