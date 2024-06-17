import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <Load>
        <img src="./src/assets/LoadingSpinner.gif" alt="" />
      </Load>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-color: #f00; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Load = styled.div``;
