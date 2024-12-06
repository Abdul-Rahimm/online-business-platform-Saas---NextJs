import React from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: #fff;
`;

const ProductBox = ({ _id, title, description, price }) => {
  return <Box>{title}</Box>;
};

export default ProductBox;
