import React from "react";
import styled from "styled-components";
import AddedProductCard from "./AddedProductCard";

const Cart = () => {
  return (
    <CartWrapper>
      <div>
        <Heading>
          <h1>Products in your Bag (1)</h1>
        </Heading>
        <CartItems>
          {/* <CartItem>
          <div className="image">
            <img
              src="https://images.pexels.com/photos/14486283/pexels-photo-14486283.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="product"
            />
          </div>

          <div className="name">
            <h2>Agrostar Shivansh Bij || Kapashi Seed</h2>
            <p>Price per quantity: $100</p>
            <div className="qty">
              <button>-</button>
              <input type="number" value={2} />
              <button>+</button>
            </div>
          </div>

          <div className="total">
            <p>$200</p>
          </div>

          <div className="remove">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </CartItem> */}
          <AddedProductCard />
        </CartItems>
        <CartSummary>
          <h1>Bill Details</h1>
          <p>Subtotal: $100</p>
          <p>Shipping: $10</p>
          <p>Discount: $20</p>
          <h2>Total: $70</h2>
          <Checkout>Checkout</Checkout>
        </CartSummary>
      </div>
    </CartWrapper>
  );
};

export default Cart;

const CartWrapper = styled.div`
  background-color: #fff;
  max-width: 100%;
  height: 90vh;
  /* margin: 0 auto; */
  padding: 20px 10px;
  position: relative;
`;

const Heading = styled.div`
  padding-left: 15px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    h1 {
      font-size: 1.7rem;
    }
  }
`;

const CartItems = styled.div`
  display: flex;
  width: 100%;
  /* flex-wrap: wrap; */
  flex-direction: column;
`;

const CartSummary = styled.div`
  position: absolute;
  width: 100%;
  /* margin-top: 20px; */
  padding: 20px;
  bottom: 50px;
  right: 0;
  border: 1px solid #ddd;
  background-color: #fff;

  h1 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 10px;
  }
  h2 {
    margin-top: 20px;
  }
`;

const Checkout = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #781414;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1.5rem;
`;
