import { useEffect } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { createPortal } from "react-dom";

const ModalBackdrop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: ${p => p.theme.colors.shadow};
z-index: 1200;
`;
const ModalContent = styled.div`
max-width: calc(100vw - 48px);
max-height: calc(100vh - 24px);
`;

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({children, onClose}) => {
useEffect(() => {
  window.addEventListener('keydown', closeModal);
  return () => window.removeEventListener('keydown', closeModal);
});

const closeModal = ({code, target, currentTarget}) => {
  if(code === 'Escape' || target === currentTarget){
    onClose();
  };
};

return createPortal(
  <ModalBackdrop onClick={closeModal}>
    <ModalContent>{children}</ModalContent>
  </ModalBackdrop>, modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
