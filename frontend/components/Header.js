import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: teal;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link href={"/"}>E-Commerce</Link>
      <nav>
        <Link href={"/products"}>All Products</Link>
        <Link href={"/categories"}>Categories</Link>
        <Link href={"/account"}>Account</Link>
        <Link href={"/cart"}>Cart (0)</Link>
      </nav>
    </StyledHeader>
  );
};

export default Header;
