import React from "react";
import Center from "./Center";
import styled from "styled-components";
import Image from "next/image";

const Background = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;

const Description = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const FeaturedProduct = () => {
  return (
    <Background>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>Macbook Pro</Title>
              <Description>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum{" "}
              </Description>
            </div>
          </Column>
          <Column>
            <img src="https://next-ecommerce-rahim.s3.amazonaws.com/1728301343982.png" />
          </Column>
        </Wrapper>
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
