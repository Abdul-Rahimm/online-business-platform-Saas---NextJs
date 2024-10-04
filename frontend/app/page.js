"use client";
import Header from "@/components/Header";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: teal;
`;

export default function Home() {
  return (
    <div className="">
      <StyledHeader>
        <Header />
      </StyledHeader>
    </div>
  );
}
