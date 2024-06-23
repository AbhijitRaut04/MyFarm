import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Store = () => {
  const location = useLocation();
  const { shopkeeper } = location.state || {};
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (shopkeeper) {
      axios
        .get(`/api/shopkeepers/${shopkeeper._id}/allProducts`)
        .then((res) => {
          setProducts(res.data);
          // console.log(res.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [shopkeeper]);

  useEffect(() => {
    console.log("Shopkeeper:", shopkeeper);
  }, [shopkeeper]);

  return (
    <Container>
      <StoreInfo>
        <div className="image">
          <ProfilePhoto src={shopkeeper.profilePhoto} alt="Profile" />
        </div>
        <div>
          <ShopName>{shopkeeper.shopName}</ShopName>
          <Name>{shopkeeper.name}</Name>
          <Location>{shopkeeper.location}</Location>
        </div>
      </StoreInfo>
      <Products>
        {products.length > 0 &&
          products.map((product) => (
            <Product key={product.id}>
              <ProductImg src={product.image} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductDetails>
                <ProductPrice>${product.price}</ProductPrice>
                <ProductRating>{product.productRating} ★</ProductRating>
              </ProductDetails>
            </Product>
          ))}
      </Products>
    </Container>
  );
};

export default Store;

export const Container = styled.div`
  /* background-color: #92d7f5; */
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  padding: 20px;
`;

export const StoreInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 20px;
  gap: 1rem;
  .image {
    width: 250px;
    height: 250px;
    /* display: flex;
      justify-content: center;
      align-items: center; */
  }
`;

export const ProfilePhoto = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 0.5rem;
  /* margin-bottom: 10px; */
  overflow: hidden;
  object-fit: cover;
`;
export const ShopName = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin: 10px 0;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export const Name = styled.p`
  font-size: 18px;
  margin: 5px 0;
`;

export const Location = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

export const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
`;

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
`;

export const ProductImg = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

export const ProductName = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

export const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ProductPrice = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export const ProductRating = styled.span`
  font-size: 16px;
  color: #f39c12;
`;
