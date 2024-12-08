import React from "react";
import Center from "./Center";
import styled from "styled-components";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import Button from "./Button";
import { useCart } from "@/providers/CartContext";

const Background = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Description = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const FeaturedProduct = ({ product }) => {
  const { setCartProducts } = useCart();

  //add the ID of the product to cart
  function addFeaturedProductToCart() {
    setCartProducts((prev) => [...prev, product._id]);
  }

  return (
    <Background>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Description>{product.description}</Description>

              <ButtonsWrapper>
                <ButtonLink href={"/products/" + product._id} $white $outline>
                  Read More
                </ButtonLink>

                <Button $white onClick={addFeaturedProductToCart}>
                  <CartIcon />
                  Add to Cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>

          <Column>
            <img src="https://next-ecommerce-rahim.s3.amazonaws.com/1728301343982.png" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Background>
  );
};

export default FeaturedProduct;

{
  /* <Image
  src={
    "https://next-ecommerce-rahim.s3.amazonaws.com/1728301343982.png"
  }
  width={350}
  height={200}
  alt="Image of Macbook"
  priority
/> */
}
