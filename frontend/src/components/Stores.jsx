import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Stores = () => {
  const [shopkeepers, setShopkeepers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/shopkeepers")
      .then((response) => {
        setShopkeepers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleOnClick = (e) => {
    // console.log(e);
    const formattedShopName = e.shopName.replace(/\s+/g, "-");
    navigate(`/stores/${formattedShopName}`, { state: { shopkeeper: e } });
  };

  return (
    <StoresList>
      {shopkeepers.map((shopkeeper, index) => (
        <StoreItem key={index} onClick={() => handleOnClick(shopkeeper)}>
          <ProfilePicture>
            <img src={shopkeeper.profilePhoto} alt={shopkeeper.name} />
          </ProfilePicture>
          <StoreInfo>
            <h2>{shopkeeper.shopName}</h2>
            <p>{shopkeeper.location}</p>
          </StoreInfo>
        </StoreItem>
      ))}
    </StoresList>
  );
};

export default Stores;

const StoresList = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const StoreItem = styled.div`
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

const StoreInfo = styled.div`
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
