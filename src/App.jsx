import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import * as API from 'services/pixabayApi';
import { toast } from 'react-toastify';
import { GalleryList } from 'components/gallery';
import { Container } from "components/container";
import { Searchbar } from "components/searchBar";
import { Loader } from "components/loader";
import { LoadMoreButton } from "components/button";
import { SearchErrorView } from "components/searchError";
import { Modal } from "components/modal";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
state = {
  query: '',
  page: 1,
  totalHits: null,
  hits: [],
  status: Status.IDLE,
  error: null,
  loading: false,
  showModal: false,
};

async componentDidUpdate (prevProps, prevState) {
  const { query, page } = this.state;
  const {query: prevQuery, page: prevPage} = prevState;
  if((prevQuery.trim() !== query.trim() && query.trim().length > 0) || page > prevPage){
    API.searchParams.q = query;
    API.searchParams.page = page;
    this.setState({status: Status.PENDING})
    try {
      const { ...data } = await API.getImages(API.searchParams);
      const { totalHits, hits } = data;
        if(totalHits || hits.length){
          if (page === 1) {toast.success(`🦄 We found ${totalHits} images.`);};
          if (page >= 1) {
            this.setState((prevState) => ({
            page,
            totalHits: totalHits,
            hits: [...prevState.hits, ...hits],
            status: Status.RESOLVED,
            loading: false,
            }));
          };
        }
        else {
          this.setState ({
          totalHits: null,
          hits: [],
          status: Status.REJECTED,
          loading: false,
          });
          toast.error("🦄 Sorry, there are no images matching your search query. Please try again.");
        };
    } catch (error) {
      this.setState({
      totalHits: null,
      hits: [],
      status: Status.REJECTED,
      error,
      loading: false,
      });
      toast.info(`Something went wrong ${error}`);
      };
    };
  };

handleFormSearch = (query) => {
  if(query === '') {
    this.setState({
    query: '',
    totalHits: null,
    hits: [],
    status: Status.REJECTED,
    loading: false,
    });
    toast('🦄 There is nothing to search!');
   };
  this.setState({ 
  query,
  page: 1,
  totalHits: null,
  hits: [],
  });
};

handleClickLoadMore = () => this.setState(({page}) => ({ page: page + 1 }));

handleToggleModal = (e) => {
  this.setState(({showModal}) => ({ showModal: !showModal }));
  if (!this.state.showModal) {
    this.setState({ largeImageURL: e.target.dataset.source, tags: e.target.alt });
  };
};

render () {
  const { hits, showModal, largeImageURL, tags, status } = this.state;
  return (
    <Container>
      <Searchbar onSearch={this.handleFormSearch}/>
      <ToastContainer autoClose={3000}/>
      {status === 'pending' && <Loader/>}
      <GalleryList images={hits} onClick={this.handleToggleModal}/>
      {status === 'resolved' && hits.length > 0 &&
        <LoadMoreButton onClick={this.handleClickLoadMore}/>}
      {status === 'rejected' && <SearchErrorView/>}
      {showModal && 
        (<Modal onClose={this.handleToggleModal}>
          <img src={largeImageURL} alt={tags}/>
        </Modal>)}
    </Container>
    );
  };
};

