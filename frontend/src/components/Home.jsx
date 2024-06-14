import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Post from "./Post";
import CreatePost from "./CreatePost";
import UserContext from "../context/UserContext";

const Home = () => {
  const categories = [
    { path: "./src/assets/allCrops.jpg", heading: "All Crops" },
    { path: "./src/assets/knowledge.png", heading: "Knowledge" },
    { path: "./src/assets/discussion.jpg", heading: "Discussion" },
    { path: "./src/assets/shop.jpg", heading: "AgriStore" },
  ];

  // ...

  const { posts, setPosts } = useContext(UserContext);

  
  // ...

  return (
    <>
      <HomeWrapper>
        <MainContent>
          <HeaderAndCategory>
            <Header>
              <Logo src="./src/assets/download1.png" />
              <Other>
                <div className="image">
                  <img src="./src/assets/cart.png" />
                </div>
                <div className="image">
                  <img src="./src/assets/translate.png" />
                </div>
                <div className="image">
                  <img src="./src/assets/location.png" />
                  <p>MAHARASHTRA</p>
                </div>
              </Other>
            </Header>
            <Category>
              {categories.map((element, index) => {
                return (
                  <CategoryOptions key={index}>
                    <img src={element.path} alt={element.heading} />
                    <p>{element.heading}</p>
                  </CategoryOptions>
                );
              })}
            </Category>
          </HeaderAndCategory>

          <SearchBar>
            <InputBox>
              <input type="text" />
              <div className="searchIcons">
                <div id="cross">
                  <i className="fa-solid fa-x icons"></i>
                </div>
                <div>
                  <i className="fas fa-search icons"></i>
                </div>
              </div>
            </InputBox>
          </SearchBar>

          {/* Temporary code */}
          {

            posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}

          <CreatePost />

          <BlankSpace></BlankSpace>
          {/* Temporary code */}

          <h1>Home</h1>
        </MainContent>
      </HomeWrapper>
      <div>Home</div>
    </>
  );
};

export default Home;

const HomeWrapper = styled.div`
  background-color: #e5e5e5;
  /* height: 100vh; */
`;
const MainContent = styled.div`
  background-color: #dddddd;
  margin: 0 auto;
  width: 600px;
  height: 100%;
`;

const HeaderAndCategory = styled.div`
  position: sticky;
  top: 0;
  border-bottom: 2px solid #dddddd;
  z-index: 100;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  background-color: #9b1f24;
  color: white;
  padding: 0 20px;
`;

const Logo = styled.img`
  /* width: 40px; */
  height: 80%;
`;

const Other = styled.div`
  /* width: 50px;
  height: 50px;
  background-color: red; */
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  .image {
    display: flex;
    img {
      width: 25px;
    }
    p {
      padding-left: 5px;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
  }
`;

const Category = styled.div`
  width: 100%;
  height: 67.27px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
`;

const CategoryOptions = styled.div`
  display: flex;
  gap: 5px;
  /* flex-direction: column; */
  align-items: center;
  img {
    width: 40px;
  }
`;

const SearchBar = styled.div`
  height: 67px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  border: 1px solid #d2d2d2;
  height: 56%;
  width: 568px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    height: 23px;
    width: 490px;
    padding: 8px 0 8px 14px;
    line-height: 23px;
    font-size: 16px;
    border: none;
    /* z-index: -1; */
  }
  input:focus {
    outline: none;
  }
  .searchIcons {
    flex: 1;
    font-size: 1rem;
    display: flex;
    justify-content: space-evenly;
    /* gap: auto; */
    #cross {
      color: #949494;
    }
  }
`;

// Temporary Code

// Temporary code

const BlankSpace = styled.div`
  height: 100vh;
`;
