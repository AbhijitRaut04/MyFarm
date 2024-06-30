import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProductCarousel = () => {
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
  );
};

export default ProductCarousel;

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
