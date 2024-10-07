import styled, { css } from "styled-components";

const StyledButton = styled.button`
  border: 0;
  color: #fff;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;

  ${(props) =>
    props.primary &&
    css`
      background-color: #5542f6;
      color: #fff;
    `};

  ${(props) =>
    props.white &&
    css`
      background-color: #fff;
      color: #000;
    `};

  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `};
`;

const Button = ({ children, ...restProps }) => {
  return <StyledButton {...restProps}>{children}</StyledButton>;
};

export default Button;
