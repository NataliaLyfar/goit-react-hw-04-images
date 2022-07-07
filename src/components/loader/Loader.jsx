import { Rings } from  'react-loader-spinner'
import styled from "styled-components";

const LoaderBox = styled.div`
margin: ${p => p.theme.space[9]}px auto;
`;

export const Loader = () => {
    return (
        <LoaderBox role='alert'>
          <Rings 
           color="#21c18e"
           height={100} 
           width={100}
           ariaLabel='loading'/>
        </LoaderBox>
    );
};