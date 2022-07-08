import styled from 'styled-components';
import errorImage from 'asset/errorImage.webp';

const ErrorBox = styled.div`
margin: 0 auto;
`;

export const SearchErrorView = () => {
  return (
    <ErrorBox role='alert'>
      <img src={errorImage} alt="errorImageUnicorn" />
    </ErrorBox>
  );
};

