import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileCard = ({ showFarmer }) => {
  const { farmer } = useContext(SessionContext);
  const [isFollower, setIsFollower] = useState(false);
  useEffect(() => {
    if (farmer.following.includes(showFarmer._id)) {
      setIsFollower(true);
    }
    console.log(showFarmer);
  }, [farmer]);

  const navigate = useNavigate();

  const toggleFollow = () => {
    if (!isFollower) {
      axios
        .post(`/api/farmers/follow/${showFarmer._id}`)
        .then((response) => {
          console.log(response);
          setIsFollower(true);
        })
        .catch((error) => {
          console.error("Error: at featching profile", error);
        });
    } else {
      axios
        .post(`/api/farmers/unfollow/${showFarmer._id}`)
        .then((response) => {
          console.log(response);
          setIsFollower(false);
        })
        .catch((error) => {
          console.error("Error: at featching profile", error);
        });
    }
  };

  return (
    <Card $isFollower={isFollower}>
      <Image onClick={() => navigate(`/profile/${showFarmer._id}`)}>
        <img src={showFarmer.profilePhoto} alt={showFarmer.username} />
      </Image>
      <h4 onClick={() => navigate(`/profile/${showFarmer._id}`)}>
        {showFarmer.username}
      </h4>
      {showFarmer._id !== farmer._id && (
        <button className="follow" onClick={toggleFollow}>
          {isFollower ? "Unfollow" : "Follow"}
        </button>
      )}
    </Card>
  );
};

export default ProfileCard;

const Card = styled.div`
  /* background-color: #d58c8c; */
  padding: 0 20px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 20px;
  h4 {
    color: #3a3a3a;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
  }
  button {
    margin-left: auto;
    padding: 8px 10px;
    background-color: #e7e7e7;
    outline: none;
    border: none;
    color: #3a3a3a;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    font-family: sans-serif;
    cursor: pointer;
  }
  .follow {
    background-color: ${(props) => (props.$isFollower ? "#e7e7e7" : "#ae2328")};
    color: ${(props) => (props.$isFollower ? "#000000" : "#ffffff")};
  }
`;
const Image = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 50%;
    height: 100%;
  }
`;
