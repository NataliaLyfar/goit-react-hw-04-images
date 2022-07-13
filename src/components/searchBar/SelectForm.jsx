import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';

const SelectTitle = styled.p`
font-size: ${p => p.theme.fontSizes.m};
margin: ${p => p.theme.space[0]}px;
`;
const SelectBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: 50,
    color: 'rgb(98,163,138)',
    padding: 5,
    backgroundColor: '#fff',
    
  }),
  indicatorSeparator: () => ({
    color: 'rgb(98,163,138)',
  }),
  singleValue: (provided, state) => {
    const color = '#fff';
    const opacity = state.isDisabled ? 0.8 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition, color};
  },
  control: (styles) => ({ ...styles, borderWidth: 0 }),
};

const optionsPerPage= [
  { value: 12, label: '12' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

export const SelectForm = ({onChange}) => {
return (
  <SelectBox>
    <SelectTitle>per Page</SelectTitle>
      <Select 
        options={optionsPerPage} 
        defaultValue={optionsPerPage[0]}
        value={optionsPerPage.value} 
        onChange={onChange}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 2,
          colors: {
            ...theme.colors,
            primary25: '#bee2e9',
            primary: 'rgba(27, 145, 139 , 0.8)',
            neutral0: 'rgba(27, 145, 139 , 0.8)',
            neutral30: 'rgba(27, 145, 139 , 0.8)',
            neutral20: '#fff',            
          },
        })}
    />
  </SelectBox>);
};

SelectForm.propTypes = {
  onChange: PropTypes.func,
};