import React from "react";
import styled from "styled-components";

const Home = () => {
  // const categories = ["All Crops", "Knowledge", "Discussions", "AgriStore"];
  const categories = [
    { path: "./src/assets/allCrops.jpg", heading: "All Crops" },
    { path: "./src/assets/knowledge.png", heading: "Knowledge" },
    { path: "./src/assets/discussion.jpg", heading: "Discussion" },
    { path: "./src/assets/shop.jpg", heading: "AgriStore" },
    // add more objects as needed
  ];

  // ...

  const handleLikeClick = () => {
    console.log('Like button clicked');
    // Add your functionality here
  };

  const handleCommentClick = () => {
    console.log('Comment button clicked');
    // Add your functionality here
  };

  const handleEditClick = () => {
    console.log('Edit button clicked');
    // Add your functionality here
  };

  const handleBookmarkClick = () => {
    console.log('Bookmark button clicked');
    // Add your functionality here
  };

  const handleDeleteClick = () => {
    console.log('Delete button clicked');
    // Add your functionality here
  };

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

          <Post>
            <UserInfo>
              <UserData>
                <UserProfile src="./src\assets\discussion.jpg" />
                <UserName>Cillian Murphy</UserName>
              </UserData>
              <PostMenu src="./src\assets\burger-menu.svg" />
            </UserInfo>
            <PostMedia src="./src\assets\post1.jpg" />
            <PostInfo>
              <button onClick={handleLikeClick}>
                <i className="fa-regular fa-heart like"></i>
              </button>
              <button onClick={handleCommentClick}>
                <i className="fa-regular fa-comment"></i>
              </button>
              <button onClick={handleEditClick}>
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
              <button onClick={handleBookmarkClick}>
                <i className="fa-regular fa-bookmark"></i>
              </button>
              <button onClick={handleDeleteClick}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </PostInfo>
            {/* <PostDetails> */}
            {/* views */}
            {/* description */}
            {/* </PostDetails> */}
          </Post>

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

const Post = styled.div`
  width: 80%;
  height: 500px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 20px;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  /* background-color: #afdaaf; */
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const UserProfile = styled.img`
  width: 45px;
  border-radius: 50%;
`;

const UserName = styled.div``;

const PostMenu = styled.img`
  width: 25px;
`;

const PostMedia = styled.img`
  object-fit: cover;
  width: 100%;
  height: 375px;

  /* height: 300px; */
  /* background-color: #ad5858; */
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  /* background-color: #afdaaf; */
  button {
    font-size: 1.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

// Temporary code

const BlankSpace = styled.div`
  height: 100vh;
`;
