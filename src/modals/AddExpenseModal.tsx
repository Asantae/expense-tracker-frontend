import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import AddExpenseForm from '../forms/AddExpenseForm';

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { amount: number; description: string; categoryId: string; selectedFrequency: string }) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ open, onClose, onSubmit }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogContent sx={{ paddingBottom: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <AddExpenseForm onSubmit={onSubmit} onClose={onClose} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddExpenseModal;