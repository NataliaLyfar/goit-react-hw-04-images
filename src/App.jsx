import { Component } from "react";
import { Container } from "components/container";
import { Modal } from "components/modal/Modal";

export class App extends Component {
state = {
  showModal: false,
};

toggleModal = () => {
  this.setState(({showModal}) => ({
    showModal: !showModal,
  }));
}
render () {
  const { showModal } = this.state;
 return (
    <Container>
      <button type="button" onClick={this.toggleModal}>open</button>
     {showModal && (
      <Modal onClose={this.toggleModal}>
      <h1>hello</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, similique? Exercitationem mollitia accusantium blanditiis aliquid aspernatur, voluptates corporis necessitatibus et veniam quisquam hic minus, laborum nihil ipsam quo porro tempore.</p>
      <button type="button" onClick={this.toggleModal}>close</button>
      </Modal>)}
    </Container>
  )
  }
};

