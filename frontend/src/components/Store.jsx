import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Store = () => {
  const location = useLocation();
  const { shopkeeper } = location.state || {};
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (shopkeeper) {
      axios
        .get(`/api/shopkeepers/${shopkeeper._id}/myProducts`)
        .then((res) => {
          setProducts(res.data);
          console.log(res.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [shopkeeper]);

  useEffect(() => {
    console.log("Shopkeeper:", shopkeeper);
  }, [shopkeeper]);

  const handleOnClick = (product) => {
    console.log(product);

    const formattedProductName = product.name.replace(/\s+/g, "-");
    navigate(`/stores/product/${formattedProductName.toLowerCase()}`, {
      state: { product },
    });
  };

  return (
    shopkeeper && (
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
              <Product key={product.id} onClick={() => handleOnClick(product)}>
                <ProductImg>
                  <img src={product.image} alt={product.name} />
                </ProductImg>
                <ProductName>{product.name}</ProductName>
                <ProductDetails>
                  <ProductPrice>₹{Math.round(product.price * 11)}</ProductPrice>
                  <ProductRating>{product.productRating} ★</ProductRating>
                </ProductDetails>
              </Product>
            ))}
        </Products>
      </Container>
    )
  );
};

export default Store;

export const Container = styled.div`
  background-color: #fff;
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
`;

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  height: 300px;
  padding: 5px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }
`;

export const ProductImg = styled.div`
  /* background-color: #da5aea; */
  width: 100%;
  height: 70%;
  margin-bottom: 5px;
  /* flex: 1; */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const ProductName = styled.h3`
  /* background-color: #da4ada; */
  font-size: 18px;
  margin: 5px 0;
  height: 20%;
`;

export const ProductDetails = styled.div`
  /* background-color: #daea; */
  max-height: 20%;
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
