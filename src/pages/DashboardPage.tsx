import { Box, Button, List, ListItem, Typography, Container, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadExpenses } from '../actions/loadExpensesActions';
import { useModal } from '../modals/useModal';
import { getFrequencyDisplayValue } from '../utils/enumUtil';
import AddExpenseForm from '../forms/AddExpenseForm';
import CustomModal from '../modals/CustomModal';

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { isOpen, openModal, closeModal } = useModal();

  const expenses = useSelector((state: RootState) => state.user.expensesList || []);
  const hasExpenses = expenses.length !== 0;

  useEffect(() => {
    const getExpenses = async () => {
      await loadExpenses(dispatch);
    };
    getExpenses();
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to your dashboard, {user?.username}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Here is an overview of your expenses:
      </Typography>
      
      <List>
        {!hasExpenses && (
          <Typography variant="body2" color="textSecondary">
            You do not have any expenses to display yet.
          </Typography>
        )}
        {expenses &&
          expenses.map((expense) => (
            <ListItem key={expense.id}>
              <Typography>
                {`${getFrequencyDisplayValue(expense.frequency)} - ${expense.description} - $${expense.amount}`}
              </Typography>
            </ListItem>
          ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={openModal}
      >
        New Expense
      </Button>
      
      <CustomModal open={isOpen} onClose={closeModal} title="Add New Expense">
        <AddExpenseForm onSubmit={closeModal} onClose={closeModal} />
      </CustomModal>
    </Container>
  );
};

export default Dashboard;
