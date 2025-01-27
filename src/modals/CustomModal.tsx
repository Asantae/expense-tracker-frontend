import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
                {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
  );
};

export default CustomModal;