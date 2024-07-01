import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "react-fontawesome";
import Loading from "./Loading";
import { toast } from "react-toastify";

const PopupContainer = ({ fetchRoute, setDisplay, type, display }) => {
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
    <ContainerWrapper $val={display ? 0:-600}>
      {loading ? (
        <Loading />
      ) : (
        <Container $count={farmers?.length || 0}>
          <div className="header">
              <h3>{type} by {farmers.length} Farmers</h3>
              <Cross onClick={toggle}>
                <FontAwesomeIcon name="fa-solid fa-x" />
              </Cross>
            </div>

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
  position:fixed;
  bottom:${props => props.$val + 50}px;
  width: 600px;
  height: 70vh;
  // background-color: rgba(18, 8, 8, 0.1);
  // backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  @media (max-width: 600px) {
    padding-bottom: 7rem;
    width: 100%;
  }
    transition: all 0.2s ease-out;
`;

const Container = styled.div`
  position: relative;
  background-color: #f2f2f2;
  // height: ${(props) => props.$count * 55 + 150}px;
  height:540px;
  // min-height: 80vh;
  // max-height: 80vh;
  overflow-y: auto;
  width: 80%;
  border-radius: 1rem;
  /* padding-top: 1rem; */
  margin: 10rem 2rem;
  .header {
    // position: sticky;
    padding-top: 1rem;
    // top: 0;
    background-color: transparent;
  }

  h3 {
    // font-size: 1.5rem;
    // font-weight: 600;
    text-align: center;
    color: #5a5a5a;
  }
`;
const Cross = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  // font-size: 1.2rem;
  // font-weight:800;
  cursor: pointer;
`;
