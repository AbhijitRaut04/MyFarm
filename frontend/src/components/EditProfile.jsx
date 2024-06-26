import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import { ScrollContext, SessionContext } from "../context/Contexts";

const EditProfile = () => {
  const navigate = useNavigate();
  const { farmer: user } = useContext(SessionContext);

  const [updatedProfile, setUpdatedProfile] = useState();

  const [imageURL, setImageURL] = useState(null);
  const { setIsCreatePostDisplay } = useContext(ScrollContext);

  useEffect(() => {
    setIsCreatePostDisplay(0);
    return () => {
      setIsCreatePostDisplay(1);
    };
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUpdatedProfile({ ...updatedProfile, profilePhoto: file });
    //setting the image in the post template
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };
  useEffect(() => {
    //revolking the object URL to free up memory
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  const handleSubmit = () => {
    console.log("submitting form");
    const formData = new FormData();
    formData.append("username", updatedProfile.username);
    formData.append("age", updatedProfile.age);
    formData.append("email", updatedProfile.email);
    formData.append("location", updatedProfile.location);
    formData.append("description", updatedProfile.description);
    formData.append("profilePhoto", updatedProfile.profilePhoto);

    axios
      .put("/api/farmers/updateProfile", formData)
      .then((response) => {
        console.log("Profile updated successfully", response);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error: at updating profile", error);
      });
  };

  return 0 ? (
    <Loading />
  ) : (
    <ProfilePageWrapper>
      <form action="">
        <UserDetails>
          <ProfilePictureAndNumbers>
            <ImageWrapper>
              <img src={imageURL || user?.profilePhoto || ""} alt="" />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
              <div className="img-wrapper">
                <i className="fa-solid fa-camera"></i>
              </div>
            </ImageWrapper>
          </ProfilePictureAndNumbers>
          <NameAndDesc>
            <Name
              placeholder={user?.username || ""}
              onChange={(e) =>
                setUpdatedProfile({
                  ...updatedProfile,
                  username: e.target.value,
                })
              }
            />
            <Age
              list="ageOptions"
              type="number"
              id="age"
              min="7"
              max="120"
              placeholder={user?.age || ""}
              onChange={(e) =>
                setUpdatedProfile({ ...updatedProfile, age: e.target.value })
              }
            />

            <Email
              type="email"
              placeholder={user?.email || ""}
              onChange={(e) =>
                setUpdatedProfile({ ...updatedProfile, email: e.target.value })
              }
            />
            <Location
              type="text"
              placeholder={user?.location || ""}
              onChange={(e) =>
                setUpdatedProfile({
                  ...updatedProfile,
                  location: e.target.value,
                })
              }
            />
            <Desc
              maxlength="210"
              placeholder="Capturing the magic of everyday moments Aesthetic Enthusiast   Color Lover Adventurer 🎨 at Heart  Mindfulness Seeker [Your City]   Let's Connect! #LifeThroughMyLens [yourwebsite.com]   DM for collaborations"
              onChange={(e) =>
                setUpdatedProfile({
                  ...updatedProfile,
                  description: e.target.value,
                })
              }
            />
          </NameAndDesc>
          <Buttons>
            <button onClick={handleSubmit} className="submit-button">
              <h1>Save</h1>
            </button>
          </Buttons>
        </UserDetails>
      </form>
    </ProfilePageWrapper>
  );
};

export default EditProfile;

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
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  @media (max-width: 600px) {
    height: 8rem;
  }
`;

const EditButton = styled.div`
  background-color: #dadada;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: -5px;
  top: -5px;
`;

const ImageWrapper = styled.div`
  height: 10rem;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  background-color: #5c1515;

  input {
    position: absolute;
    /* background-color: #ff01bb; */
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 1;
    opacity: 0;
  }

  img {
    height: 10rem;
    width: 10rem;
    object-fit: cover;
    object-position: top;
  }

  .img-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    /* bottom: 0; */
    top: 0;
    background-color: #78787876;
    color: #00000099;
    /* padding: 0.5rem; */
    /* border-radius: 50%; */
    /* z-index: 20; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
  }

  @media (max-width: 600px) {
    height: 7rem;
    img {
      height: 7rem;
      width: 7rem;
    }
    i {
      font-size: 2rem;
    }
  }
`;

const NameAndDesc = styled.div`
  /* background-color: #45c7f3; */
  height: auto;
  min-height: 12rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .descignation {
    color: #9a9595;
  }

  .description {
    margin-top: 2rem;
    align-self: flex-start;
  }
  * {
    background-color: #eaeaea;
    color: black;
    margin-top: 0.5rem;
    font-size: 1.5rem;
    border: none;
    width: auto;
    border-radius: 0.5rem;
    text-align: center;
    &::placeholder {
      color: #000000;
    }
  }
`;

const Name = styled.input`
  font-size: 2rem;
  border-radius: 0.8rem;
`;

const Age = styled.input``;

const Email = styled.input``;

const Location = styled.input``;

const Desc = styled.textarea`
  border-radius: 0.5rem;
  text-align: center;
  width: 95%;
  height: 14rem;
  margin-top: 1rem;
  text-align: start;
`;

const Buttons = styled.div`
  /* background-color: #f3a645; */
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    font-size: 1rem;
    background-color: #bb292e;
    color: #fff;
    padding: 0.5rem;
    text-align: center;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
  }
`;
