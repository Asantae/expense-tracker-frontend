import { Box, Button, Typography, Container, Modal, IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadExpenses } from '../actions/loadExpensesActions';
import { useModal } from '../modals/useModal';
import AddExpenseForm from '../forms/AddExpenseForm';
import CustomModal from '../modals/CustomModal';
import ExpensesTable from '../components/expenses/ExpensesTable';
import { Add } from '@mui/icons-material';

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { openModalName, openModal, closeModal } = useModal();

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
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
          <IconButton onClick={() => openModal("add")}>
            <Tooltip title="Add an expense">
              <Add sx={{ cursor: 'pointer' }}/>
            </Tooltip>
          </IconButton>    
      </Box>

      <br/>

      {hasExpenses ? (
        <ExpensesTable data={expenses}/>
      ):(
        <Typography variant="body2" color="textSecondary">
          You do not have any expenses to display yet. To add an expense click the plus button.
        </Typography>
      )}
      
      <CustomModal open={openModalName === "add"} onClose={closeModal} title="Add Expense">
        <AddExpenseForm onSubmit={closeModal} onClose={closeModal} />
      </CustomModal>
    </Container>
  );
};

export default Dashboard;