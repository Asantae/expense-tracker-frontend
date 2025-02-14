import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography } from '@mui/material';
import CategoryDropdown from './CategoryDropdown';
import FrequencyDropdown from './FrequencyDropdown';
import { Expense } from '../interfaces/Expense';
import { Frequency } from '../interfaces/FrequencyEnum';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { hasApiActivity } from '../utils/hasApiActivityUtil';
import CustomButton from '../components/CustomButton';
import { editExpenseAction } from '../actions/editExpenseAction';

interface EditExpenseFormProps {
  expenseId: string;
  onSubmit: () => void;
  onClose: () => void;
}

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({ expenseId, onClose }) => {
  const dispatch: AppDispatch = useDispatch();

  const expenseToEdit = useSelector((state: RootState) =>
    state.user.expensesList?.find((expense: Expense) => expense.id === expenseId)
  );
  
  const isEditingExpense = useSelector((state: RootState) =>
    hasApiActivity(state, 'user/editExpense/pending')
  );
  const isAddingCategoryToList = useSelector((state: RootState) =>
    hasApiActivity(state, 'user/addCategoryToList/pending')
  );
  const isLoading = isEditingExpense || isAddingCategoryToList;

  const [amount, setAmount] = useState<number>(expenseToEdit?.amount ?? 0);
  const [description, setDescription] = useState<string>(expenseToEdit?.description ?? '');
  const [categoryId, setCategoryId] = useState<string>(expenseToEdit?.categoryId ?? '');
  const [selectedFrequency, setSelectedFrequency] = useState<string>(expenseToEdit?.frequency ?? '');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount ?? 0);
      setDescription(expenseToEdit.description ?? '');
      setCategoryId(expenseToEdit.categoryId ?? '');
      setSelectedFrequency(expenseToEdit.frequency ?? '');
    }
  }, [expenseToEdit]);

  const formHasError = () => {
    return !amount || !selectedFrequency || !categoryId || amount <= 0;
  };

  const getAmountHelperText = () => {
    if (!submitted) return '';
    if (!amount) return 'This is a required field.';
    if (amount <= 0) return 'The amount must be greater than zero.';
    return '';
  };

  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (formHasError()) {
      return;
    }

    const updatedExpense: Expense = {
      id: expenseId,
      amount,
      description,
      categoryId,
      frequency: selectedFrequency as Frequency,
    };

    const result = await dispatch(editExpenseAction(updatedExpense));
    if (result) {
      onClose();
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmitExpense}>
        <TextField
          error={submitted && (amount === 0 || amount <= 0)}
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
          helperText={getAmountHelperText()}
          sx={{ mb: 2 }}
        />
        <TextField
          multiline={true}
          rows={4}
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          sx={{ mb: 2 }}
        />
        <CategoryDropdown
          id={categoryId}
          error={submitted && !categoryId}
          onCategorySelect={setCategoryId}
          isLoading={isLoading}
          helperText={submitted && !categoryId ? 'This is a required field.' : ''}
        />
        <FrequencyDropdown
          value={selectedFrequency}
          error={submitted && !selectedFrequency}
          onFrequencySelect={setSelectedFrequency}
          isLoading={isLoading}
          helperText={
            submitted && !selectedFrequency ? 'This is a required field.' : ''
          }
        />
        <CustomButton
          isLoading={isLoading}
          loading={isLoading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Save Expense
        </CustomButton>
      </form>
    </Container>
  );
};

export default EditExpenseForm;