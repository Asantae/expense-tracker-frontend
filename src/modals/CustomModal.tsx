import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { Clear } from '@mui/icons-material';

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
    >
      <Box 
        display='flex' 
        flexDirection='row' 
        justifyContent='space-between'
        sx={{ mx: 0, px: 0 }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
            <Clear 
              fontSize='medium' 
              sx={{ 
                cursor: 'pointer', 
                color: 'white', 
                mr: 2 
              }} 
              onClick={onClose} 
              color="secondary"
            />
        </DialogActions>
      </Box>
        <DialogContent>
                {children}
        </DialogContent>
    </Dialog>
  );
};

export default CustomModal;