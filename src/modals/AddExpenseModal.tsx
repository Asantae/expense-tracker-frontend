import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
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
        <DialogContent>
            <AddExpenseForm onSubmit={onSubmit} onClose={onClose}/>
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