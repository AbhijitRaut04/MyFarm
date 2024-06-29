import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import { ScrollContext, SessionContext } from "../context/Contexts";
import PopupContainer from "./PopupContainer";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoding] = useState(true);
  const [user, setUser] = useState();

  const { farmer } = useContext(SessionContext);
  console.log("fdsgfd");
  let { id } = useParams();
  console.log(farmer);
  if (!id && farmer) id = farmer._id;

  const [displayFollowers, setDisplayFollowers] = useState(false);
  const [displayFollowing, setDisplayFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);

  const showFollowers = () => {
    setDisplayFollowers(true);
    setDisplayFollowing(false);
  };
  const showFollowing = () => {
    setDisplayFollowing(true);
    setDisplayFollowers(false);
  };

  useEffect(() => {
    // setIsCreatePostDisplay(0);

    axios
      .get(`/api/farmers/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoding(false);
        console.log(response);
        response.data.followers.forEach((follower) => {
          if (farmer && farmer._id === follower._id) {
            setIsFollower(true);
          }
        });
      })
      .catch((error) => {
        console.error("Error: at featching profile", error);
        navigate("/signin");
      });

    return () => {
      // setIsCreatePostDisplay(1);
    };
  }, []);

  const toggleFollow = () => {
    if (!isFollower) {
      axios
        .post(`/api/farmers/follow/${id}`)
        .then((response) => {
          console.log(response);
          setIsFollower(true);
        })
        .catch((error) => {
          console.error("Error: at featching profile", error);
        });
    } else {
      axios
        .post(`/api/farmers/unfollow/${id}`)
        .then((response) => {
          console.log(response);
          setIsFollower(false);
        })
        .catch((error) => {
          console.error("Error: at featching profile", error);
        });
    }
  };

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
            {!farmer ? (
              <>
                <div>
                  <h2>{user.followers?.length || 0}</h2>
                  <p>Followers</p>
                </div>
                <div>
                  <h2>{user.following?.length || 0}</h2>
                  <p>Following</p>
                </div>
              </>
            ) : (
              <>
                <div onClick={showFollowers}>
                  <h2>{user.followers?.length || 0}</h2>
                  <p>Followers</p>
                </div>
                <div onClick={showFollowing}>
                  <h2>{user.following?.length || 0}</h2>
                  <p>Following</p>
                </div>
              </>
            )}
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
        <Buttons $isFollower={isFollower}>
          {farmer && id != farmer._id ? (
            <>
              <button className="follow" onClick={toggleFollow}>
                {isFollower ? "Unfollow" : "Follow"}
              </button>
              <button
                className="message"
                onClick={() => navigate(`/discussion/${farmer.username}`)}
              >
                Message
              </button>
              <button className="email">Email</button>
            </>
          ) : (
            <button onClick={() => navigate("/edit-profile")} className="edit">
              Edit
            </button>
          )}

          <button className="moreOptions">
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </Buttons>
      </UserDetails>

      <PostWrapper>
        {user.posts.map((post) => (
          <div className="post" key={post._id}>
            <img src={post.file} alt="img link broken" />
          </div>
        ))}
      </PostWrapper>

      {displayFollowers ? (
        <PopupContainer
          fetchRoute={`/api/farmers/followers/${user._id}`}
          setDisplay={setDisplayFollowers}
          Title={`${user.followers.length} Farmers follows ${user.username}`}
        />
      ) : (
        ""
      )}
      {displayFollowing ? (
        <PopupContainer
          fetchRoute={`/api/farmers/following/${user._id}`}
          setDisplay={setDisplayFollowing}
          Title={`${user.username} follows to ${user.following.length} Farmers`}
        />
      ) : (
        ""
      )}
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
  position: relative;
  @media (max-width: 600px) {
    height: 8rem;
  }
`;

const ImageWrapper = styled.div`
  height: 10rem;
  overflow: hidden;
  border-radius: 50%;

  img {
    height: 10rem;
    width: 10rem;
    object-fit: cover;
    object-position: top;
  }

  @media (max-width: 600px) {
    height: 7rem;
    img {
      height: 7rem;
      width: 7rem;
    }
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
  height: auto;
  min-height: 12rem;
  padding-bottom: 1rem;

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
    /* font-weight: 600; */
    background-color: #e7e7e7;
    padding: 0.5rem 0;
    text-align: center;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
  }
  .follow,
  .message,
  .email,
  .edit {
    flex: 1;
  }
  .follow {
    /* background-color: #ae2328; */
    background-color: ${(props) => (props.$isFollower ? "#e7e7e7" : "#ae2328")};
    color: ${(props) => (props.$isFollower ? "#000000" : "#ffffff")};
  }
  .moreOptions {
    width: 2rem;
    text-align: center;
  }
  @media (max-width: 600px) {
    padding: 0;
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
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    .post {
      border-radius: 0.5rem;
      height: 20rem;
    }
  }
`;
