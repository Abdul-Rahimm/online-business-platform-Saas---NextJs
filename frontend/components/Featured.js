import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: xx-large;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

export default function Featured() {
  return (
    <Bg>
      <Center className="flex">
        <Wrapper>
          <Column>
            <div>
              <Title>Macbook 14 Pro</Title>
              <Desc>
                lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
                ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
                ipsumlorem ipsum lorem ipsum
              </Desc>
              <Button white size="l">
                Read more
              </Button>
              <Button primary size="l">
                Add to Cart
              </Button>
            </div>
          </Column>
          <Column>
            <img
              src="https://dawid-next-ecommerce.s3.amazonaws.com/1679151719649.png"
              alt=""
            />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
}
