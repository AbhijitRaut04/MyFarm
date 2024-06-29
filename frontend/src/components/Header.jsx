import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ScrollContext, SessionContext, UserContext } from '../context/Contexts';
import styled from "styled-components";
import FontAwesomeIcon from 'react-fontawesome'
import axios from "axios";

const Header = () => {

    const { farmer, setCheckout } = useContext(SessionContext)

    const navigate = useNavigate();
    const { isScrolledPast } = useContext(ScrollContext);


    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const clearInput = () => {
        setInputValue("");
    };

    const handleLogout = () => {
        axios.post('api/farmers/logout').then(
            (reponse) => {
                setCheckout((prev) => !prev);
                navigate('/signin')
            }
        ).catch(error => {
            console.log(error)
        })
    }

    return (
        <Hearders id="headerSection">
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
                <Logo onClick={() => navigate("/home")} src="./src/assets/download1.png" />
            )}

            <Other>
                {
                    (!farmer) ?
                        <>
                            <Link to={'/signup'} style={{color:"white", textDecoration:"none"}}>Register</Link>
                            /
                            <Link to={'/signin'} style={{color:"white", textDecoration:"none"}}>Login</Link>
                        </> :
                        <>
                            <Link to="/cart" style={{ color: "white" }}>
                                <FontAwesomeIcon name="fa-solid fa-cart-shopping" />
                            </Link>
                            <Link to={`/profile/${farmer._id}`}><i className="fa-solid fa-user" style={{ color: "white" }}></i></Link>
                            <FontAwesomeIcon onClick={handleLogout} name="fa-solid fa-right-from-bracket" />
                        </>
                }
            </Other>
        </Hearders>
    )
}

export default Header




const Hearders = styled.div`
position: sticky;
top: 0;
/* border-bottom: 2px solid #dddddd; */
z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  background-color: #9b1f24;
  color: white;
  padding: 0 20px;
  @media (max-width: 600px) {
    height: 3.5rem;
  }
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
