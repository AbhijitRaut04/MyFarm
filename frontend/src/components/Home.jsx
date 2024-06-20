import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import CreatePost from "./CreatePost";
import UserContext from "../context/UserContext";

const Home = () => {
  const { posts, setIsScrolledPast } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);

  //showing cross icon in the search bar only when something is written
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  //checking if the search is behind the category tab
  const handleScroll = useCallback(() => {
    const categoryBottom = document
      .querySelector("#category")
      .getBoundingClientRect().bottom;
    const searchBarTop = document
      .querySelector("#searchBar")
      .getBoundingClientRect().bottom;
    setIsScrolledPast(searchBarTop < categoryBottom);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(0); // Scrolling down
      } else {
        setIsVisible(1); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const [displayCreatePost, setDisplayCreatePost] = useState(false);
  const handleCreate = () => {
    console.log("creating new post");
    setDisplayCreatePost(true);
  };

  const [showPostedMessage, setShowPostedMessage] = useState(false);

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
      {posts.map(
        (post, index) => (
          <Post key={index} post={post} />
        )
        // console.log(post)
      )}

      <CreatePostWrapper $display={displayCreatePost}>
        <CreatePost
          setShowPostedMessage={setShowPostedMessage}
          setDisplayCreatePost={setDisplayCreatePost}
        />
      </CreatePostWrapper>
      <PostedMsg $display={showPostedMessage}>Posted</PostedMsg>

      <BlankSpace></BlankSpace>
      {/* Temporary code */}
      {/* <Create /> */}

      <Create onClick={handleCreate} $isvisible={isVisible}>
        <i className="fa-regular fa-plus"></i>
      </Create>
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

const CreatePostWrapper = styled.div`
  width: 600px;
  height: 100%;
  background-color: rgba(18, 8, 8, 0.1);
  /* border: 1px solid rgba(255,255,255,0.1); */
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  position: fixed;
  top: 0;
  display: ${(props) => (props.$display ? "block" : "none")};
`;

const PostedMsg = styled.div`
  position: fixed;
  bottom: ${(props) => (props.$display ? "20px" : "-100px")};
  opacity: ${(props) => (props.$display ? 1 : 0)};
  left: 50%;
  transform: translate(-50%, -50%);
  transition: bottom 1s ease-in-out, opacity 1s ease-in-out;

  background-color: #303030;
  color: #13cb35;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const BlankSpace = styled.div`
  height: 100vh;
`;

const Create = styled.div`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: ${(props) => (props.$isvisible == 1 ? "0" : "-200px")};
  right: calc(50vw - 300px);
  background-color: #9b1f24;
  color: white;
  font-size: 1.7rem;
  margin: 0 30px 30px 0;
  border-radius: 50%;
  transition: bottom 0.5s ease-out;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    right: 10px; /* Adjust for mobile screens */
    width: 85px;
    height: 85px;
    margin: 0 50px 50px 0;
  }
`;
