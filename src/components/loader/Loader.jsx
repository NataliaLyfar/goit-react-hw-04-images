import PropTypes from 'prop-types';
import styled from "styled-components";

const LoaderBox = styled.div`
margin: ${p => p.theme.space[9]}px auto;
`;

export const Loader = ({children}) => {
  return <LoaderBox role='alert'>{children}</LoaderBox>
};

Loader.propTypes = {
  children: PropTypes.any,
}