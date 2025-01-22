import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import AddExpenseModal from '../modals/AddExpenseModal';
import { useModal } from '../modals/useModal';
import { Expense } from '../../interfaces/Expense';
import { loadExpenses } from '../actions/loadExpensesActions';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';

const Expenses = () => {
    const dispatch: AppDispatch = useDispatch();
    const { isOpen, openModal, closeModal } = useModal();

    const handleSubmitExpense = (data: { amount: number; description: string; categoryId: string; frequency: number }) => {
        console.log('Expense added:', data);
    };

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const hasExpenses =  expenses.length === 0;   

    useEffect(() => {
        const getExpenses = async () => {
            const expensesData = await loadExpenses(dispatch);
            setExpenses(expensesData);
        };
        getExpenses();
    }, [dispatch]);

    return (
    <Box>
        <Typography variant="h4" gutterBottom>
            Expenses
        </Typography>
        <List>
            {hasExpenses && 
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
            onSubmit={handleSubmitExpense} />
    </Box>
    );
};

export default Expenses;