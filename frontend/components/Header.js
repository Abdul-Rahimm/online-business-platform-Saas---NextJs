import Link from "next/link";
import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link href={"/"}>Fast-Commerce</Link>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/products"}>Products</Link>
        <Link href={"/categories"}>Categories</Link>
        <Link href={"/account"}>Account</Link>
        <Link href={"/cart"}>Cart (0)</Link>
      </nav>
    </StyledHeader>
  );
};

export default Header;
