import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoding] = useState(true);
  const [user, setUser] = useState();
  const [ownPosts, setOwnPosts] = useState();

  //navigate to signin page if user is not logged in
  useEffect(() => {
    console.log("fetching farmer posts");
    axios
      .get("/api/posts/myPosts")
      .then((response) => {
        // console.log("Current farmer posts",response);
        console.log("featching posts completed");
        setOwnPosts(response.data);
      })
      .catch((error) => {
        console.error("Error: at fetching posts", error);
      });

    console.log("fetching farmer profile");
    axios
      .get("/api/farmers/profile")
      .then((response) => {
        console.log("featching profile completed");
        setUser(response.data);
        setLoding(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error: at featching profile", error);
        navigate("/signin");
      });
  }, []);

  const postImages = ownPosts?.map((post) => post.file) || [];

  return loading ? (
    <Loading />
  ) : (
    <ProfilePageWrapper>
      <UserDetails>
        <ProfilePictureAndNumbers>
          <ImageWrapper>
            <img src={user.profilePhoto || ""} alt="" />
          </ImageWrapper>
          <Numbers>
            <div>
              <h2>{user.posts?.length || 0}</h2>
              <p>Posts</p>
            </div>
            <div>
              <h2>{user.followers?.length || 0}</h2>
              <p>Followers</p>
            </div>
            <div>
              <h2>{user.following?.length || 0}</h2>
              <p>Following</p>
            </div>
          </Numbers>
        </ProfilePictureAndNumbers>
        <NameAndDesc>
          <Name>{user.username || ""}</Name>
          <p className="descignation">Farmer</p>
          <p>
            🌟✨ Capturing the magic of everyday moments ✨🌟 |
            <br /> 📸 Aesthetic Enthusiast | 🎨 Color Lover <br />
            🌍 Adventurer at Heart 🧘‍♀️ Mindfulness Seeker <br />
            📍 [Your City] | 📬 Let's Connect! #LifeThroughMyLens 💫❤️
            <br />
            <br />
            🔗 [yourwebsite.com] | 💌 DM for collaborations
          </p>
        </NameAndDesc>
        <Buttons>
          <button className="follow">Follow</button>
          <button className="message">Message</button>
          <button className="email">Email</button>
          <button className="moreOptions">
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </Buttons>
      </UserDetails>

      <PostWrapper>
        {postImages.map((post, index) => (
          <div className="post" key={index}>
            <img src={post} alt="img link broken" />
          </div>
        ))}
      </PostWrapper>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;

const ProfilePageWrapper = styled.div`
  background-color: #ffffff;
  width: 100%;
  min-height: 100vh;
  height: auto;
  /* padding-top: 2rem; */
  padding: 1rem 1.5rem 0 1.5rem;
`;

const UserDetails = styled.div`
  /* background-color: #bc3b8b; */
  width: 100%;
  height: auto;
`;

const ProfilePictureAndNumbers = styled.div`
  /* background-color: #a663b2; */
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const ImageWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  border-radius: 50%;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Numbers = styled.div`
  background-color: #fff;
  flex: 1;
  height: 50%;

  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1rem;
  }
`;

const NameAndDesc = styled.div`
  /* background-color: #45c7f3; */
  height: 12rem;

  .descignation {
    color: #9a9595;
  }
`;

const Name = styled.h2`
  margin-top: 0.5rem;
  font-size: 2rem;
`;

const Buttons = styled.div`
  /* background-color: #f3a645; */
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  button {
    font-size: 1.2rem;
    font-weight: 600;
    background-color: #e7e7e7;
    padding: 0.5rem 0;
    text-align: center;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
  }
  .follow,
  .message,
  .email {
    flex: 1;
  }
  .follow {
    background-color: #ae2328;
    color: #fff;
  }
  .moreOptions {
    width: 2rem;
    text-align: center;
  }
`;

const PostWrapper = styled.div`
  /* background-color: #f3a645; */
  margin-top: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.3rem;
  .post {
    height: 15rem;
    overflow: hidden;
    /* border-radius: 0.2rem; */
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  } */
`;
