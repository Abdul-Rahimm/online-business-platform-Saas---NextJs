import Link from "next/link";
import styled from "styled-components";
import { ButtonStyle } from "./PrimaryButton";

const StyledLink = styled(Link)`
  ${ButtonStyle}
  text-decoration: none;
`;

const ButtonLink = (props) => {
  return <StyledLink {...props} />;
};

export default ButtonLink;
