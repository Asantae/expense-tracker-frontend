import React from 'react';
import { Modal, Box } from '@mui/material';

interface ModalWrapperProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, closeModal, children }) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box>{children}</Box>
    </Modal>
  );
};

export default ModalWrapper;