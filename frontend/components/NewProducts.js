import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function NewProducts({ products }) {
  console.log(products);
  return (
    <Center>
      <ProductsGrid>
        {products.map((product) => (
          <ProductBox {...product} />
        ))}
      </ProductsGrid>
    </Center>
  );
}
