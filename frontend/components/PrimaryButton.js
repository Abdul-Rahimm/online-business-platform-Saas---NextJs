import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  cursor: pointer;
  padding: 5px 20px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;

  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

  ${(props) =>
    props.$size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
        margin-right: 5px;
      }
    `}

  ${(props) =>
    props.$primary === true &&
    css`
      background-color: #5542f6;
      border: 1px solid #5542f6;

      color: #fff;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

const PrimaryButton = ({ children, ...restProps }) => {
  return <StyledButton {...restProps}>{children}</StyledButton>;
};

export default PrimaryButton;
