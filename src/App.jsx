import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import * as API from 'services/pixabayApi';
import { toast } from 'react-toastify';
import { GalleryList } from 'components/Gallery';
import { Container } from "components/Container";
import { SearchBar } from "components/SearchBar";
import { Loader } from "components/Loader";
import { Rings } from  'react-loader-spinner';
import { LoadMoreButton } from "components/Button";
import { SearchErrorView } from "components/SearchError";
import { Modal } from "components/Modal";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(12);
const [status, setStatus] = useState(Status.IDLE);
const [images, setImages] = useState([]);
const [showModal, setShowModal] = useState(false);
const [imageData, setImageData] = useState({url: null, alt: ''});

useEffect (() => {
  if(!query){
    return;
  };
  (async () => {
    setStatus(Status.PENDING);
    API.searchParams.q = query;
    API.searchParams.page = page;
    API.searchParams.per_page = perPage;
    try {
      const { totalHits, hits } = await API.getImages(API.searchParams);
        if(totalHits){
          if (page === 1) {toast.success(`🦄 We found ${totalHits} images.`);};
            setImages(images => [...images, ...hits]);
            setStatus(Status.RESOLVED);
          if(hits.length < 12){toast.info(`🦄 No more images for ${query}`);};
        }
        else {
          setImages([]);
          setStatus(Status.REJECTED);
          toast.error("🦄 Sorry, there are no images matching your search query. Please try again.");
        };
    } catch (error) {
      setImages([]);
      setStatus(Status.REJECTED);
      toast.info(`Something went wrong ${error}`);
    };
    })();
  }, [query, page, perPage]);

useEffect(() => {
  window.scrollBy({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}, [images]);

const handleFormSearch = (query) => {
  if(!query) {
    setImages([]);
    setStatus(Status.REJECTED);
    toast('🦄 There is nothing to search!');
   };
   setQuery(query);
   setPage(1);
   setImages([]);
};
const handleChoicePerPage = (e) => {
  console.log(e);
  setPerPage(e.value);
}
const handleClickLoadMore = () => setPage(page =>  page + 1);

const handleToggleModal = (e) => {
  setShowModal(prevState => !showModal);
  if (!showModal) {
    setImageData({ url: e.target.dataset.source, alt: e.target.alt });
  };
};

return (
  <Container>
    <SearchBar onSearch={handleFormSearch} onChange={handleChoicePerPage}/>
    <ToastContainer autoClose={3000}/>
    {status === Status.REJECTED && <SearchErrorView/>}
    {status === Status.PENDING && 
      <Loader> 
        <Rings color="#21c18e" height={100} width={100} ariaLabel='loading'/>
      </Loader>}
    {images.length !== 0 && <GalleryList images={images} onClick={handleToggleModal}/>}
    {images.length >= API.searchParams.per_page &&
      <LoadMoreButton onClick={handleClickLoadMore}>Load more</LoadMoreButton>}
    {showModal && 
      <Modal onClose={handleToggleModal}>
        <img src={imageData.url} alt={imageData.alt}/>
      </Modal>}
  </Container>
  );
};

