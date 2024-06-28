import React, { useContext, useState } from 'react'
import styled from "styled-components";
import { ScrollContext, SessionContext, UserContext } from '../context/Contexts';
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    
    const { farmer } = useContext(SessionContext)

    const { isVisible, isCreatePostDisplay } = useContext(ScrollContext);
    const [displayCreatePost, setDisplayCreatePost] = useState(false);

    const handleCreate = () => {
        if (!farmer) {
            toast.info("Please login")
            return;
        }
        setDisplayCreatePost(true);
    };

    return (
        <>
            <Create
                onClick={handleCreate}
                $isvisible={isVisible}
                $isdisplayed={isCreatePostDisplay}
            >
                <i className="fa-regular fa-plus"></i>
            </Create>
            <CreatePostWrapper $display={displayCreatePost}>
                <CreatePost
                    setDisplayCreatePost={setDisplayCreatePost}
                />
            </CreatePostWrapper>

            <Category id="category" $isvisible={isVisible}>
                <CategoryOptions onClick={() => navigate("/home")}>
                    <i className="fa-solid fa-house"></i>
                    <p>Home</p>
                </CategoryOptions>
                <CategoryOptions onClick={() => navigate("/stores")}>
                    <i className="fa-solid fa-store"></i>
                    <p>Stores</p>
                </CategoryOptions>
                <CategoryOptions onClick={() => navigate("/experts")}>
                    <i className="fa-solid fa-chalkboard-user"></i>
                    <p>Experts</p>
                </CategoryOptions>
                <CategoryOptions onClick={() => navigate("/discussion")}>
                    <i className="fa-solid fa-message"></i>
                    <p>Discussion</p>
                </CategoryOptions>
            </Category>
        </>
    )
}

export default Navbar


const Category = styled.div`
  position: fixed;
  bottom: ${(props) => (props.$isvisible == 1 ? "0" : "-200px")};
  width: 600px;
  height: 67.27px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: bottom 0.5s ease-out;
  z-index: 10;
  i {
    font-size: 1.5rem;
    color: #9b1f24;
  }
  @media (max-width: 600px) {
    width: 100%;
    font-size: 0.7rem;
    i {
      font-size: 1.2rem;
    }
  }
`;

const CategoryOptions = styled.div`
  display: flex;
  flex: 1;
  cursor: pointer;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 40px;
  }
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
  margin: 0 30px 80px 0;
  border-radius: 50%;
  transition: bottom 0.5s ease-out;
  cursor: pointer;

  display: ${(props) => (props.$isdisplayed == 1 ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    right: 10px;
    width: 55px;
    height: 55px;
    margin: 0 20px 90px 0;
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
  @media (max-width: 600px) {
    width: 100%;
  }
`;