import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import { UserContext } from "../context/Contexts";

const Home = () => {
  const { posts } = useContext(UserContext);

  //showing cross icon in the search bar only when something is written
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const clearInput = useCallback(() => {
    setInputValue("");
  }, []);

  return (
    <>
      <SearchBar id="searchBar">
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
      </SearchBar>

      {/* Temporary code */}
      {posts.map((post, index) => (
          <Post key={index} post={post} />
        ),
        console.log("ffsdfsd")
      )}

      <BlankSpace></BlankSpace>
    </>
  );
};

export default Home;

const SearchBar = styled.div`
  height: 67px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
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

const BlankSpace = styled.div`
  height: 100vh;
`;
