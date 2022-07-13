import { useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { SelectForm } from "./SelectForm";

const HeaderWraper = styled.header`
top: 0;
left: 0;
position: sticky;
z-index: 1100;
display: flex;
justify-content: center;
align-items: center;
min-height: 64px;
padding: ${p => p.theme.space[2]}px ${p => p.theme.space[5]}px;
color: ${p => p.theme.colors.white};
margin-bottom: ${p => p.theme.space[3]}px;
background: ${p => p.theme.colors.primary};
background: linear-gradient(90deg, rgba(49,48,62,1) 0%, rgba(42,135,106,1) 27%, rgba(24,147,144,1) 81%, rgba(140,200,212,1) 99%);
box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
  0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
@media (max-width: 955px) {
    flex-direction: column;
};
`;
const SearchForm = styled.form`
display: flex;
align-items: center;
width: 100%;
max-width: 600px;
background-color: ${p => p.theme.colors.white};
border-radius: ${p => p.theme.radii.normal};
overflow: hidden;
`;
const SearchInput = styled.input`
display: inline-block;
width: 100%;
font: inherit;
font-size: ${p => p.theme.fontSizes.l};
border: none;
outline: none;
padding-left: ${p => p.theme.space[2]}px;
padding-right: ${p => p.theme.space[0]}px;
&::placeholder {
    font: inherit;
    font-size: ${p => p.theme.fontSizes.m};
  };
`;
const SearchButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 48px;
height: 48px;
border: 0;
opacity: 0.7;
background: ${p => p.theme.colors.secondary};
transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
cursor: pointer;
outline: none;
svg{
    width: 20px;
    height: 20px;
};
&:hover {
    opacity: 1; 
  };
`;
const Notification = styled.p`
margin-right: ${p => p.theme.space[0]}px;
padding: ${p => p.theme.space[1]}px 0;
`;

export const SearchBar = ({onSearch, onChange, totalHits}) => {
const [query, setQuery] = useState('');

const handleChange = e => setQuery(e.currentTarget.value.toLowerCase());

const handleSubmit = (e) => {
  e.preventDefault();
  onSearch(query);
  setQuery('');
};

return (
  <HeaderWraper>
    <Notification>🦄 found {totalHits} images!</Notification>
      <SearchForm onSubmit={handleSubmit} >
          <SearchInput
          type="text"
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          />
          <SearchButton type="submit"><GoSearch/></SearchButton>
      </SearchForm>
      <SelectForm onChange={(e) => onChange(e)} />
  </HeaderWraper>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  totalHits: PropTypes.number,
};