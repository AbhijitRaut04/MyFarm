import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from 'react-toastify';
import Loading from "./Loading";
import { SessionContext, UserContext } from "../context/Contexts";

const CreatePost = ({ setDisplayCreatePost }) => {

  const {farmer} = useContext(SessionContext)
  const {setRefresh} = useContext(UserContext)
  //post template
  const [post, setPost] = useState({
    isPublic: true,
  });

  const VisibilityIcon = React.memo(({ isPublic, toggleIsPublic }) => (
    <button onClick={toggleIsPublic}>
      {isPublic ? (
        <i className="fa-solid fa-earth-asia"></i>
      ) : (
        <i className="fa-solid fa-lock"></i>
      )}
    </button>
  ));

  const [imageURL, setImageURL] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPost({ ...post, media: file });
    //setting the image in the post template
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  const toggleIsPublic = () => {
    setPost({ ...post, isPublic: !post.isPublic });
  };

  const handleTextChange = (event) => {
    event.target.style.height = "inherit";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append("media", post.media);
    formData.append("heading", event.target.elements["heading"].value);
    formData.append("description", event.target.elements["description"].value);
    formData.append("isPublic", post.isPublic);
    
    setPost((post) => ({
      ...post,
      heading: event.target.elements["heading"].value,
      description: event.target.elements["description"].value,
    }));

    axios
      .post("/api/posts/createPost", formData)
      .then((response) => {
        setRefresh((prev) => !prev);
        toast.success("Post created successfully🎉");
        if (imageURL) {
          URL.revokeObjectURL(imageURL);
          setImageURL(null);
        }

        event.target.elements["heading"].value = "";
        event.target.elements["description"].value = "";

        setLoading(false);
        setDisplayCreatePost(false);
        setTimeout(() => {
          
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
  };

  useEffect(() => {
    //revolking the object URL to free up memory
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  return (
    <>
      {(loading && <Loading />) || ""}

      <PostWrapper>
        <form onSubmit={onSubmit}>
          <UserInfo>
            <UserData>
              <UserProfile src={farmer?.profilePhoto} />
              <UserName>{farmer?.username}</UserName>
            </UserData>
            <div className="icons">
              <button onClick={() => setDisplayCreatePost(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              {/* <button onClick={toggleIsPublic}>
                {(post.isPublic && (
                  <i className="fa-solid fa-earth-asia"></i>
                )) || <i className="fa-solid fa-lock"></i>}
              </button> */}
              <VisibilityIcon
                isPublic={post.isPublic}
                toggleIsPublic={toggleIsPublic}
              />
              <button type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </UserInfo>

          <PostMedia>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
            />
            <img
              src={imageURL ? imageURL : "./src/assets/addImage.png"}
              alt="image link broken"
            />
          </PostMedia>

          <PostDetails>
            <textarea
              className="heading"
              name="heading"
              type="text"
              placeholder="Edit Heading..."
              onChange={handleTextChange}
              required={true}
              />
            <textarea
              className="para"
              name="description"
              type="text"
              placeholder="Edit Description..."
              onChange={handleTextChange}
              required={true}
            />
          </PostDetails>
        </form>
      </PostWrapper>
    </>
  );
};

export default CreatePost;

const PostWrapper = styled.div`
  width: 90%;
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

  .icons {
    display: flex;
    gap: 20px;
  }
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const UserProfile = styled.img`
  width: 45px;
  height: 45px;
  object-fit:center;
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
