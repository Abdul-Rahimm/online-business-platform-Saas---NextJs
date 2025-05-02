import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button, { ButtonStyle } from "./Button";
import { useCart } from "@/providers/CartContext";
import FlyingButton from "react-flying-item";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 120px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;

  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }

  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const StyledFlyingButton = styled(FlyingButton)`
  ${ButtonStyle}
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const url = "/product/" + _id;
  const { addProduct } = useCart();

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>

      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <StyledFlyingButton
            src={images?.[0]}
            targetTop={"5%"}
            targetLeft={"95%"}
            flyingItemStyling={{}}
          >
            <Button block onClick={() => addProduct(_id)} primary outline>
              Add to cart
            </Button>
          </StyledFlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
