import PropTypes from 'prop-types';
import styled from "styled-components";
import { GalleryItem } from "./GalleryItem";

const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: ${p => p.theme.space[3]}px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

export const GalleryList = ({images, onClick}) => {
  return (
    <List>
      {images.map(({id, webformatURL, largeImageURL, tags}) => (
      <GalleryItem 
       key={id}
       webformatURL={webformatURL}
       largeImageURL={largeImageURL}
       tags={tags}
       onClick={onClick}
      />
      ))}
    </List>
  );
};

GalleryList.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};