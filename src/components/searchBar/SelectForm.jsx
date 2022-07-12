import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';

const SelectTitle = styled.p`
font-size: ${p => p.theme.fontSizes.m};
margin: ${p => p.theme.space[0]}px;
`;
const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: 50,
    borderBottom: '1px dotted pink',
    color: 'rgb(98,163,138)',
    padding: 5,
    backgroundColor: '#fff',
  }),
  indicatorSeparator: () => ({
    color: 'rgb(98,163,138)',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.8 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  },
};

const optionsPerPage= [
  { value: 12, label: '12' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

export const SelectForm = ({onChange}) => {
return (
  <>
    <SelectTitle>per Page</SelectTitle>
      <Select 
        options={optionsPerPage} 
        defaultValue={optionsPerPage[0]}
        value={optionsPerPage.value} 
        onChange={onChange}
        styles={customStyles}
    />
  </>);
};

SelectForm.propTypes = {
  onChange: PropTypes.func,
};