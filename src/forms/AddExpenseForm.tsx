import React, { useState } from 'react';
import { TextField, Container, Typography } from '@mui/material';
import CategoryDropdown from './CategoryDropdown';
import FrequencyDropdown from './FrequencyDropdown';
import { addExpenseAction } from '../actions/addExpenseAction';
import { Expense } from '../interfaces/Expense';
import { Frequency } from '../interfaces/FrequencyEnum';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { hasApiActivity } from '../utils/hasApiActivityUtil';
import CustomButton from '../components/CustomButton';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Dayjs } from 'dayjs';
import { formattedDate } from '../utils/dateUtil';

interface AddExpenseFormProps {
  onSubmit: (data: { amount: number; description: string; categoryId: string; frequency: string, date: string }) => void;
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

  const [amount, setAmount] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>();
  const [submitted, setSubmitted] = useState(false);

  const isLoading = isAddingCategoryToList || isAddingExpenseToList;

  const hasOneTimeFrequency = frequency === Frequency.OneTime;

  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if(formHasError()){ return; }

    const newExpense: Expense = {
      amount, 
      description,
      categoryId,
      frequency: frequency as Frequency,
      date: date ? formattedDate(date) : ""
    };
    
    const result = await dispatch(addExpenseAction(newExpense));
    if(result){
      onClose();
    }
  };

  const getAmountHelperText = () => {
    if (!submitted) {return "";}
    if (!amount) {return "This is a required field.";}
    if (amount <= 0) {return "The amount must be greater than zero.";}
    return "";
  };

  const amountHasError = () => {
    return submitted && (!amount || amount <= 0);
  };

  const formHasError = () => {
    return !amount || !frequency || !categoryId || amountHasError();
  }

  return (
    <Container maxWidth="xs">
        <form onSubmit={handleSubmitExpense}>
          <TextField
            error={amountHasError()}
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
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            sx={{ mb: 2 }}
            slotProps={{
              input: {
                endAdornment: !description && (
                  <Typography variant="body1" sx={{ color: 'text.secondary', ml: 2 }}>
                    Optional
                  </Typography>
                ),
              },
            }}
          />
          <CategoryDropdown 
            error={submitted && !categoryId}
            onCategorySelect={setCategoryId} 
            isLoading={isLoading} 
            helperText={submitted && !categoryId ? "This is a required field." : ""}
          />
          <FrequencyDropdown 
            error={submitted && !frequency}
            onFrequencySelect={setFrequency} 
            isLoading={isLoading} 
            helperText={submitted && !frequency ? "This is a required field." : ""}
          />
          {hasOneTimeFrequency && 
            <DateField disableFuture 
              value={date}
              onChange={(newDate) => setDate(newDate)}
              sx={{ width: "100%", mb: 2 }}
              slotProps={{
                textField: {
                  error: submitted && hasOneTimeFrequency && !date,
                  helperText: submitted && hasOneTimeFrequency && !date ? "When Frequency is One-Time, this is a required field." : ""
                }
              }}
            />
          }
          <CustomButton  
            isLoading={isLoading}
            loading={isLoading}
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Submit Expense
          </CustomButton>        
        </form>
    </Container>
  );
};

export default AddExpenseForm;