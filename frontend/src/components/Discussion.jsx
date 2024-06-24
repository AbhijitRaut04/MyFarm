import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";

const Discussion = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { farmer } = useContext(SessionContext);

  useEffect(() => {
    if (farmer) setUsers(farmer.followers);
    console.log(farmer?.followers);
  }, [farmer]);

  const handleOnClick = (user) => {
    navigate(`/chat/${user.username}`, { state: { user: user } })
    // console.log(e);
    // const formattedShopName = e.shopName.replace(/\s+/g, "-");
    // navigate(`/stores/${formattedShopName}`, { state: { user: e } });
  };

  return (
    <DiscussionList>
      {users!= [] && users.map((user, index) => (
        <User key={index} onClick={() => handleOnClick(user)}>
          <ProfilePicture>
            <img src={user.profilePhoto} alt={user.name} />
          </ProfilePicture>
          <UserInfo>
            <h2>{user.username}</h2>
            <p>{user.location}</p>
          </UserInfo>
        </User>
      ))}
    </DiscussionList>
  );
};

export default Discussion;

const DiscussionList = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const User = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const ProfilePicture = styled.div`
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    font-size: 1rem;
    color: #666;
  }
`;
