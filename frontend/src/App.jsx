import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <>
    <ToastContainer />
      <HomeWrapper>
        <MainContent>

          <Header />
          <Navbar />
          <Outlet />

        </MainContent>
      </HomeWrapper>
    </>
  );
};

export default App;

const HomeWrapper = styled.div`
  background-color: #e5e5e5;
  min-height: 100vh;
  min-height: calc(100vh - 48px);
`;
const MainContent = styled.div`
  background-color: #dddddd;
  margin: 0 auto;
  width: 600px;
  height: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Example shadow */
  @media (max-width: 600px) {
    width: 100%;
    background-color: #fff;
  }
`;
