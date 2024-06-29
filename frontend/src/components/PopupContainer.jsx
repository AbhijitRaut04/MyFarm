import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "react-fontawesome";
import Loading from "./Loading";
import { toast } from "react-toastify";

const PopupContainer = ({ fetchRoute, setDisplay, type }) => {
  const [farmers, setFarmers] = useState([]);
  const { farmer } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);

  const showContainer = () => {
    axios
      .get(`${fetchRoute}`)
      .then((response) => {
        setFarmers(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error fetching farmers");
      })
      .finally(() => setLoading(false));
  };

  const toggle = () => {
    setDisplay(false);
  };

  useEffect(() => {
    showContainer();
  }, [farmer]);

  return (
    <ContainerWrapper>
      {loading ? (
        <Loading />
      ) : (
        <Container $count={farmers?.length || 0}>
          <h3>
            {type} by {farmers.length} Farmers
          </h3>
          <Cross onClick={toggle}>
            <FontAwesomeIcon name="fa-solid fa-x" />
          </Cross>

          {farmers &&
            farmers.map((farmer) => (
              <div key={farmer._id}>
                <ProfileCard showFarmer={farmer} />
              </div>
            ))}
        </Container>
      )}
    </ContainerWrapper>
  );
};

export default PopupContainer;

const ContainerWrapper = styled.div`
  width: 600px;
  height: 100vh;
  background-color: rgba(18, 8, 8, 0.1);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Container = styled.div`
  position: relative;
  background-color: #fff;
  height: ${(props) => props.$count * 55 + 50}px;
  width: 400px;
  border-radius: 1rem;
  padding-top: 1rem;
  margin: 10rem 2rem;
  h3 {
    font-weight: 600;
    text-align: center;
    color: #5a5a5a;
  }
`;
const Cross = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 0.8rem;
  cursor: pointer;
`;
