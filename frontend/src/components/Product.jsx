import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ScrollContext } from "../context/Contexts";
import ProductCarousel from "./ProductCarousel";

const Product = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();

  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const checkProductInCart = async () => {
      try {
        const response = await axios.get(`/api/products/${product._id}/cart`);
        const cart = response.data;
        const isProductInCart = cart.some((item) => item._id === product._id);
        setAddedToCart(isProductInCart);
      } catch (err) {
        console.error("Error checking product in cart:", err);
      }
    };

    if (product && product._id) {
      checkProductInCart();
    }
  }, [product]);

  const { setCalculateVisibility } = useContext(ScrollContext);
  useEffect(() => {
    setCalculateVisibility(0);
    return () => {
      setCalculateVisibility(1);
    };
  }, []);
  console.log(product);
  let star = 4.5;

  const handleAddToCart = () => {
    if (addedToCart) {
      navigate("/cart");
    }
    axios
      .patch(`/api/products/${product._id}/addToCart`)
      .then((res) => {
        console.log(res.data);
        setAddedToCart(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBuy = () => {
    alert("Order Placed Successfully");
  };

  return (
    <ProductPage>
      <Hero>
        <Header>
          <Brand>
            <BrandImage>
              <img src="https://agrostar.in/AgrostarLogo.png" alt="" />
            </BrandImage>
            <p>Agrostar</p>
          </Brand>
          <Rating>
            <div>
              {Array(Math.floor(star))
                .fill()
                .map((_, i) => (
                  <i class="fa-solid fa-star"></i>
                ))}
              {star % 1 !== 0 && <i class="fa-solid fa-star-half-stroke"></i>}
              {Array(5 - Math.ceil(star))
                .fill()
                .map((_, i) => (
                  <i class="fa-regular fa-star"></i>
                ))}
            </div>
            <h3>43 Farmers</h3>
          </Rating>
        </Header>
        <Name>{product.name}</Name>
        <ProductCarousel />
        <Info>
          <Price>
            <p>₹{product.price * 19}</p>
            <p className="previous-price">₹{product.price * 21}</p>
            <p className="discount">
              ( {Math.floor((3 * 19) / product.price)}% Off )
            </p>
          </Price>
          <Description>{product.description}</Description>
          <ExtraInfo>
            <p>Category: {product.category}</p>
          </ExtraInfo>
        </Info>
      </Hero>
      <Promises>
        <div>
          <img src="../../src/assets\values_original_product.svg" alt="n" />
          <p>100% Original Products</p>
        </div>
        <div>
          <img src="../../src/assets\valueKisaan.svg" alt="" />
          <p>Updates and plans through agricultural science videos</p>
        </div>
        <div>
          <img src="../../src/assets\values_weather_info.svg" alt="" />
          <p>Crop planning with accurate weather information</p>
        </div>
        <div>
          <img src="../../src/assets\rating-star.svg" alt="" />
          <p>Free Home Delievery</p>
        </div>
      </Promises>
      <Buttons>
        <button className="add" onClick={handleAddToCart}>
          {" "}
          {addedToCart ? "Go To Cart" : "Add to Cart"}
        </button>
        <button className="buy" onClick={handleBuy}>
          Buy Now
        </button>
      </Buttons>
      <Extra></Extra>
    </ProductPage>
  );
};

export default Product;

const ProductPage = styled.div`
  background-color: #ffffff;
  width: 100%;
  min-height: 93vh;
  height: auto;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0rem 1.2rem;
  padding-bottom: 1rem;
`;

const Header = styled.div`
  /* background-color: #b5d9e8; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
`;

const Brand = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  p {
    color: #777;
  }
`;

const BrandImage = styled.div`
  background-color: #9b1f24;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
  width: 80px;
  padding-top: 5px;
  /* height: 100px; */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  align-items: flex-end;
  gap: 0.3rem;
  div {
    color: #ffbc0b;
    display: flex;
    gap: 0.3rem;
  }
  h3 {
    color: #31cb3b;
  }
`;

const Name = styled.h1`
  font-size: 1.2rem;
  font-weight: 800;
  margin: 3px 0;
`;

const Info = styled.div`
  /* background-color: #dac; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 5px;
`;

const Price = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  p {
    font-size: 1.1rem;
    font-weight: 800;
  }
  .previous-price {
    color: #777;
    font-size: 1.1rem;
    text-decoration-line: line-through;
  }
  .discount {
    font-size: 1.1rem;
    color: #228129;
  }
`;

const Description = styled.div`
  font-size: 1rem;
  color: #666;
`;

const ExtraInfo = styled.div`
  display: flex;
  color: #676767;
  /* flex-direction: column; */
  gap: 1rem;
`;

const Promises = styled.div`
  /* background-color: #df3939; */
  padding: 1rem 0.2rem;
  margin: 0 1rem;
  overflow-x: auto;
  display: flex;
  gap: 1rem;
  width: auto;
  div {
    background-color: #ce9898;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    min-width: 160px;
    height: 120px;
    border-radius: 0.7rem;
    padding: 0 5px;
    img {
      width: 45px;
      /* height: 30px; */
    }
    p {
      font-size: 0.9rem;
    }
  }
  div:nth-child(4n + 1) {
    background-color: #f0e0d9;
  }

  div:nth-child(4n + 2) {
    background-color: #bad2bf;
  }

  div:nth-child(4n + 3) {
    background-color: #eadcdd;
  }

  div:nth-child(4n) {
    background-color: #ece9e0;
  }
`;

const Buttons = styled.div`
  position: fixed;
  bottom: 0;
  width: 600px;
  height: 50px;
  z-index: 10;
  button {
    color: white;
    width: 50%;
    height: 100%;
    border: none;
    font-size: 1.7rem;
    cursor: pointer;
  }
  .add {
    background-color: #9b1f24;
  }
  .buy {
    background-color: #00733e;
  }
  @media (max-width: 600px) {
    width: 100%;
    font-size: 0.7rem;
  }
`;

const Extra = styled.div`
  height: 100vh;
`;
