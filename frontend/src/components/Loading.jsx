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
  /* background-color: #f00; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

