import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import CategoryDropdown from './CategoryDropdown';
import FrequencyDropdown from './FrequencyDropdown';
import { addExpenseAction } from '../actions/addExpenseAction';
import { Expense } from '../interfaces/Expense';
import { Frequency } from '../interfaces/FrequencyEnum';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

interface AddExpenseFormProps {
  onSubmit: (data: { amount: number; description: string; categoryId: string; selectedFrequency: string }) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('');

  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      amount, 
      description,
      categoryId,
      frequency: selectedFrequency as Frequency
    };
    await dispatch(addExpenseAction(newExpense));
  };

  return (
    <form>
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
        <Button onClick={handleSubmitExpense} type="submit" variant="contained" color="primary" fullWidth>
            Add Expense
        </Button>
    </form>
  );
};

export default AddExpenseForm;