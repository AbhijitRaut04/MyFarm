import React, { useState } from "react";
import styled from "styled-components";

const AddedProductCard = () => {
  const [count, setCount] = useState(1);

  return (
    <CartItem>
      <div className="image">
        <img
          src="https://images.pexels.com/photos/13009437/pexels-photo-13009437.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="product"
        />
      </div>

      <div className="name">
        <h2>Agrostar Shivansh Bij || Kapashi Seed</h2>
        <p>Price per quantity: $100</p>
        <div className="qty">
          <button
            onClick={() => setCount((prev) => prev - 1)}
            disabled={count <= 1}
          >
            <i class="fa-solid fa-minus"></i>
          </button>
          <input value={count} />
          <button onClick={() => setCount((prev) => prev + 1)}>
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="total">
        <p>$200</p>
      </div>

      <div className="remove">
        <i class="fa-solid fa-xmark"></i>
      </div>
    </CartItem>
  );
};

export default AddedProductCard;

const CartItem = styled.div`
  /* background-color: #56dda5; */
  height: 150px;
  display: flex;
  width: 100%;
  gap: 30px;
  justify-content: flex-start;
  align-items: start;
  margin-bottom: 5px;
  border-bottom: 1px solid #ddd;
  position: relative;
  /* padding-bottom: 20px; */

  .image {
    height: 90%;
    width: 20%;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .name {
    margin-top: 10px;
    h2 {
      font-size: 1.5rem;
      margin-bottom: 5px;
      width: 90%;
    }
    p {
      color: #777;
      margin-bottom: 15px;
    }
  }

  .qty {
    display: flex;
    align-items: center;
    /* gap: 10px; */
    margin-left: 15px;
  }
  .qty button {
    background-color: #fff;
    color: #777;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    border: 1px solid #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  .qty button:disabled {
    background-color: #eee;
    color: #ddd;
    border-color: #ddd;
    cursor: not-allowed;
  }
  .qty input {
    height: 30px;
    width: 50px;
    text-align: center;
    /* padding-left: 15px; */
    color: #000;
    outline: none;
    border: none;
    font-size: 1.5rem;
  }

  .total {
    position: absolute;
    bottom: 60px;
    right: 5px;
    /* font-size: 1.5rem; */
  }

  .remove {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 1.5rem;
    color: #999;
  }

  @media (max-width: 600px) {
    .name h2 {
      font-size: 1rem;
      /* width: 90%; */
    }
    .image {
      height: 80%;
      width: 25%;
    }
    .qty input {
      font-size: 1rem;
    }
    .qty button {
      font-size: 0.8rem;
    }
    .remove {
      font-size: 1.2rem;
    }
  }
`;
