import React, { useContext, useState } from "react";
import "./App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import UserContext from "./context/UserContext";

const App = () => {
  const categories = [
    { path: "./src/assets/allCrops.jpg", heading: "All Crops" },
    { path: "./src/assets/knowledge.png", heading: "Knowledge" },
    { path: "./src/assets/discussion.jpg", heading: "Discussion" },
    { path: "./src/assets/shop.jpg", heading: "AgriStore" },
  ];

  // ...
  const navigate = useNavigate();

  // ...

  // checking if the user is logged in or not if yes -> "/profile" else -> "/signin"
  const navigateIt = async () => {
    axios
      .get("/api/verify")
      .then((response) => {
        if (response.data.isLoggedIn) {
          navigate("/profile");
        } else {
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  //

  //showing cross icon in the search bar only when something is written
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // Clears the input field
  const clearInput = () => {
    setInputValue("");
  };

  const { isScrolledPast } = useContext(UserContext);

  return (
    <>
      <HomeWrapper>
        <MainContent>
          <HeaderAndCategory>
            <Header>
              {/* if scrolled -> searchInHeader else -> logo */}
              {isScrolledPast ? (
                <SearchInHeader>
                  <InputBox>
                    <input
                      type="text"
                      placeholder="Search Products"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <div className="searchIcons">
                      {inputValue && (
                        <div id="cross" onClick={clearInput}>
                          <i className="fa-solid fa-x icons"></i>
                        </div>
                      )}
                      <div>
                        <i className="fas fa-search icons"></i>
                      </div>
                    </div>
                  </InputBox>
                </SearchInHeader>
              ) : (
                <Logo
                  onClick={() => navigate("/")}
                  src="./src/assets/download1.png"
                />
              )}

              <Other>
                <Link to="/cart" className="image">
                  <img src="./src/assets/cart.png" />
                </Link>
                <div className="image">
                  <img src="./src/assets/translate.png" />
                </div>
                <i onClick={navigateIt} className="fa-solid fa-user"></i>
                {/* <div className="image">
                  <img src="./src/assets/location.png" />
                  <p>MAHARASHTRA</p>
                </div> */}
              </Other>
            </Header>
            <Category id="category">
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

          <Outlet />

          <BlankSpace></BlankSpace>
          {/* Temporary code */}

          <h1>Home</h1>
        </MainContent>
      </HomeWrapper>
    </>
  );
};

export default App;

const HomeWrapper = styled.div`
  background-color: #e5e5e5;
  /* height: 100vh; */
`;
const MainContent = styled.div`
  background-color: #dddddd;
  margin: 0 auto;
  width: 600px;
  height: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Example shadow */
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

const SearchInHeader = styled.div`
  width: 70%;
  height: 67px;
  transform: translateY(21%);
  animation: slideIn 0.1s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-300%);
    }
    to {
      transform: translateY(21%);
    }
  }
`;

const Other = styled.div`
  /* width: 50px;
  height: 50px;
  background-color: red; */
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;

  * {
    cursor: pointer;
  }

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

const InputBox = styled.div`
  border: 1px solid #d2d2d2;
  background-color: #fff;
  height: 56%;
  /* width: 568px; */
  /* width: 94.6%; */
  width: 100%;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus-within {
    border: 2px solid #9b1f24;
  }

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
    /* border: 2px solid red; */
  }
  .searchIcons {
    flex: 1;
    font-size: 1rem;
    display: flex;
    justify-content: end;
    /* gap: 1rem; */
  }
  * {
    margin: 0 0.3rem;
  }
  .fa-x {
    color: #949494;
  }
  .fa-search {
    color: #9b1f24;
  }
`;

// Temporary Code

// Temporary code

const BlankSpace = styled.div`
  height: 100vh;
`;
