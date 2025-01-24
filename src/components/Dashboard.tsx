import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadCategories } from '../actions/loadCategoriesActions';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadExpenses } from '../actions/loadExpensesActions';
import AddExpenseModal from '../modals/AddExpenseModal';
import { setExpenses } from '../store/userSlice';
import { useModal } from '../modals/useModal';
import { Expense } from '../interfaces/Expense';

const Dashboard = () => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const { isOpen, openModal, closeModal } = useModal();

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const hasExpenses =  expenses.length !== 0;   

    useEffect(() => {
        const getExpenses = async () => {
            const expensesData = await loadExpenses(dispatch);
            setExpenses(expensesData);
        };
        getExpenses();
    }, [dispatch]);
    
    return (
      <Box>
        <Typography>Welcome to your dashboard, {user?.username}. Here is an overview of your expenses.</Typography>
        <br/>
        <List>
            {!hasExpenses && 
                <Typography>You do not have any expenses to display yet</Typography>
            }
            {expenses && expenses.map((expense) => (
                <ListItem key={expense.id}>
                    <Typography>{`${expense.description} - $${expense.amount}`}</Typography>
                </ListItem>
            ))}
        </List>
        <Button variant="contained" color="primary" onClick={openModal}>
          New Expense
        </Button>
        <AddExpenseModal
            open={isOpen}
            onClose={closeModal} 
            onSubmit={() => {}}
        />
      </Box>
    );
};

export default Dashboard;