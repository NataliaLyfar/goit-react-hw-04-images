import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import * as API from 'services/pixabayApi';
import { toast } from 'react-toastify';
import { GalleryList } from 'components/gallery';
import { Container } from "components/container";
import { SearchBar } from "components/searchBar";
import { Loader } from "components/loader";
import { Rings } from  'react-loader-spinner';
import { LoadMoreButton } from "components/button";
import { SearchErrorView } from "components/searchError";
import { Modal } from "components/modal";

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
const [totalHits, setTotalHits] = useState(0);
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
            setImages(images => [...images, ...hits]);
            setTotalHits(totalHits);
            setStatus(Status.RESOLVED);
          if(hits.length < 12){toast.info(`🦄 No more images for ${query}`);};
        }
        else {
          setImages([]);
          setTotalHits(0);
          setStatus(Status.REJECTED);
          toast.error("🦄 Sorry, there are no images matching your search query. Please try again.");
        };
    } catch (error) {
      setImages([]);
      setTotalHits(0);
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
    setTotalHits(0);
    toast('🦄 There is nothing to search!');
   };
   setQuery(query);
   setPage(1);
   setTotalHits(0)
   setImages([]);
};
const handleChoicePerPage = (e) => setPerPage(e.value);

const handleClickLoadMore = () => setPage(page =>  page + 1);

const handleToggleModal = (e) => {
  setShowModal(prevState => !showModal);
  if (!showModal) {
    setImageData({ url: e.target.dataset.source, alt: e.target.alt });
  };
};

return (
  <Container>
    <SearchBar onSearch={handleFormSearch} onChange={handleChoicePerPage} totalHits={totalHits}/>
    <ToastContainer autoClose={3000}/>
    {status === Status.REJECTED && <SearchErrorView/>}
    {status === Status.PENDING && 
      <Loader> 
        <Rings color="#21c18e" height={100} width={100} ariaLabel='loading'/>
      </Loader>}
    {images.length !== 0 && <GalleryList images={images} onClick={handleToggleModal}/>}
    {images.length >= perPage &&
      <LoadMoreButton onClick={handleClickLoadMore}>Load more</LoadMoreButton>}
    {showModal && 
      <Modal onClose={handleToggleModal}>
        <img src={imageData.url} alt={imageData.alt}/>
      </Modal>}
  </Container>
  );
};

