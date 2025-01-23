import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import CategoryDropdown from './CategoryDropdown';
import FrequencyDropdown from './FrequencyDropdown';

interface AddExpenseFormProps {
  onSubmit: (data: { amount: number; description: string; categoryId: string; selectedFrequency: string }) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount, description, categoryId, selectedFrequency });
  };

  return (
    <form onSubmit={handleSubmit}>
        <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
        />
        <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <CategoryDropdown onCategorySelect={setCategoryId}/>
        <FrequencyDropdown onFrequencySelect={setSelectedFrequency}/>
        <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Expense
        </Button>
    </form>
  );
};

export default AddExpenseForm;