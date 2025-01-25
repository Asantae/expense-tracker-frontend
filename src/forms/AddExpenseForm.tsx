import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import CategoryDropdown from './CategoryDropdown';
import FrequencyDropdown from './FrequencyDropdown';
import { addExpenseAction } from '../actions/addExpenseAction';
import { Expense } from '../interfaces/Expense';
import { Frequency } from '../interfaces/FrequencyEnum';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { hasApiActivity } from '../utils/hasApiActivityUtil';
import CustomButton from '../components/CustomButton';

interface AddExpenseFormProps {
  onSubmit: (data: { amount: number; description: string; categoryId: string; selectedFrequency: string }) => void;
  onClose: () => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const isAddingExpenseToList = useSelector((state: RootState) =>
    hasApiActivity(state, 'user/addExpenseToList/pending')
  );
  const isAddingCategoryToList = useSelector((state: RootState) =>
    hasApiActivity(state, 'user/addCategoryToList/pending')
  );
  const isLoading = isAddingCategoryToList || isAddingExpenseToList;

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
    
    const result = await dispatch(addExpenseAction(newExpense));
    if(result){
      onClose();
    }
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
            disabled={isLoading}
        />
        <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
        />
        <CategoryDropdown onCategorySelect={setCategoryId} isLoading={isLoading}/>
        <FrequencyDropdown onFrequencySelect={setSelectedFrequency} isLoading={isLoading}/>
        <CustomButton 
          onClick={handleSubmitExpense} 
          isLoading={isLoading}
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
        >
           Submit Expense
        </CustomButton>
    </form>
  );
};

export default AddExpenseForm;