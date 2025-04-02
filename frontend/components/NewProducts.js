import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import Center from "./Center";
//added the center component

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

export default function ProductsGrid({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <StyledProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
      </StyledProductsGrid>
    </Center>
  );
}
