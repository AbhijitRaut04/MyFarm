import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ScrollContext } from "../context/Contexts";

const Product = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const { setCalculateVisibility } = useContext(ScrollContext);
  useEffect(() => {
    setCalculateVisibility(0);
    return () => {
      setCalculateVisibility(1);
    };
  }, []);
  console.log(product);
  let star = 4.5;

  const images = [
    "https://images.pexels.com/photos/20677420/pexels-photo-20677420/free-photo-of-under-the-clouds.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/15802450/pexels-photo-15802450/free-photo-of-close-up-of-a-person-holding-a-google-pixel-smartphone.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/19671785/pexels-photo-19671785/free-photo-of-two-people-walking-down-a-path-in-the-fog.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSlide, images.length]);

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
        <Carousel>
          <div className="carousel">
            <div className="carousel-images">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index}`}
                  style={{ display: index === currentSlide ? "block" : "none" }}
                />
              ))}
            </div>
            <div className="carousel-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </Carousel>
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
        <button className="add">Add to Cart</button>
        <button className="buy">Buy Now</button>
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

const Carousel = styled.div`
  width: 100%;
  position: relative;
  /* max-height: 200px; */
  .Carousel {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .carousel-images {
    display: flex;
    transition: transform 0.5s ease-in-out;
    overflow: hidden;
    height: 100%;
  }

  .carousel-images img {
    height: 400px;
    flex-shrink: 0;
    object-fit: fill;
    width: 100%;
  }

  .carousel-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .dot {
    cursor: pointer;
    height: 7px;
    width: 7px;
    margin: 0 5px;
    background-color: #ffffff;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.3s ease;
  }

  .dot:hover {
    background-color: #888;
  }

  .dot.active {
    background-color: #dadada;
  }

  @keyframes slide {
    from {
      opacity: 0.7;
    }
    to {
      opacity: 1;
    }
  }

  .carousel-images img {
    animation: slide 1s ease-in;
  }
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
