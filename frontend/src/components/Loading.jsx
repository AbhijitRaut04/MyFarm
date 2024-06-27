import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <img src="./src/assets/LoadingSpinner.gif" alt="" />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50%;
  height: calc(100vh - 48px);
  transform: translateY(-55%);
  /* background-color: #f00; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
