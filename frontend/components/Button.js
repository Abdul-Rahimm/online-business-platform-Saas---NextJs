import styled, { css } from "styled-components";
// 7 16 50
const StyledButton = styled.button`
  border: 0;
  color: #fff;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(props) =>
    props.$primary &&
    css`
      background-color: #5542f6;
      color: #fff;
    `};

  ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #fff;
      color: #000;
    `};

  ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      border: 1px solid #fff;
      color: #fff;
      background-color: transparent;
    `};

  ${(props) =>
    props.$size === "l" &&
    css`
      /* font-size: 1.2rem; */
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `};
`;

const Button = ({ children, ...restProps }) => {
  return <StyledButton {...restProps}>{children}</StyledButton>;
};

export default Button;
