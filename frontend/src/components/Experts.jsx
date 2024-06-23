import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Experts = () => {
  const [expertUsers, setExpertUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/experts")
      .then((response) => {
        setExpertUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleOnClick = (e) => {
    // console.log(e);
    const formattedShopName = e.shopName.replace(/\s+/g, "-");
    navigate(`/stores/${formattedShopName}`, { state: { expertUser: e } });
  };

  return (
    <ExpertsList>
      {expertUsers.map((expertUser, index) => (
        <Expert key={index} onClick={() => handleOnClick(expertUser)}>
          <ProfilePicture>
            <img src={expertUser.profilePhoto} alt={expertUser.name} />
          </ProfilePicture>
          <ExpertInfo>
            <h2>{expertUser.name}</h2>
            <p>{expertUser.location}</p>
          </ExpertInfo>
        </Expert>
      ))}
    </ExpertsList>
  );
};

export default Experts;

const ExpertsList = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Expert = styled.div`
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

const ExpertInfo = styled.div`
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
