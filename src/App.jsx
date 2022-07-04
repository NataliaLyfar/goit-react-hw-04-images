import { Component } from "react";
import axios from "axios";
import { Notify } from 'notiflix';
import { Container } from "components/container";
import { ImageGallery } from "components/gallery/ImageGallery";
import { Button } from "components/buttons/Button";
// import { Modal } from "components/modal/Modal";



const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27183497-70bd3599297502793f5a9350a';
const url = `${BASE_URL}?key=${API_KEY}`;

const params = {
        q: 'cat',
        page: 1,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 12,
};
export class App extends Component {
state = {
  images: null,
  loading: false,
  // showModal: false,
};

async componentDidMount(){
  this.setState({loading: true});
  try {
  const { data } = await axios.get(url, {params});
  const {hits} = data;
   
    this.setState({images: hits});
    console.log(this.state);
  } catch (error) {
    Notify.info("Sorry, there are no images matching your search query. Please try again.", 
    {position: 'center-top', fontSize: '16px', width: '370px', info: {background: 'rgba(139, 6, 94)'}})
  }
  this.setState({loading: false});
}


// toggleModal = () => {
//   this.setState(({showModal}) => ({
//     showModal: !showModal,
//   }));
// }
render () {
  const { images, loading } = this.state;
 return (
    <Container>
      {loading && <h2>Loading...</h2>}
      {images && (<ImageGallery images={images}/>)}
      <Button>Load more</Button>
      {/* <button type="button" onClick={this.toggleModal}>open</button> */}
     {/* {showModal && (
      <Modal onClose={this.toggleModal}>
      <img src="" alt="" />
      <button type="button" onClick={this.toggleModal}>close</button>
      </Modal>)} */}
    </Container>)
  }
};

