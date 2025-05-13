import styled from "styled-components";

const { BounceLoader } = require("react-spinners");

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `display:block; display: flex; justify-content: center`
      : `border: 4px solid blue`}
`;

const Spinner = ({ fullWidth }) => {
  return (
    <Wrapper fullWidth={fullWidth}>
      <BounceLoader speedMultiplier={3} color={"#555"} />
    </Wrapper>
  );
};

export default Spinner;
