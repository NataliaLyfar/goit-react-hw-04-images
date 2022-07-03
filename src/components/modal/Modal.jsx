import React, { Component } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const ModalBackdrop = styled.div`
position: fixed;
width: 100vw;
height: 100vh;
top: 0;
left: 0;
background-color: ${p => p.theme.colors.backdrop};
`;
const ModalContent = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
min-height: 300px;
max-width: 600px;
width: 100%;
padding: ${p => p.theme.space[2]}px;
background-color: ${p => p.theme.colors.white};
border-radius: ${p => p.theme.radii.normal};
box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 5px, rgba(0, 0, 0, 0.1) -1px -1px 5px,
rgba(0, 0, 0, 0.1) -1px 1px 5px, rgba(0, 0, 0, 0.1) 1px -1px 5px;
`;

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
};
componentWillUnmount(){
    
}

handleKeyDown = e => {
    if (e.code === 'Escape') {
       this.props.onClose();
    };
  };


  render() {
    return createPortal(
        <ModalBackdrop>
        <ModalContent>
           {this.props.children}
        </ModalContent>
        </ModalBackdrop>, modalRoot)
    };
};

