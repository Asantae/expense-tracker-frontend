import React, { useEffect, useState } from 'react';
import { loadExpenses } from '../actions/expenseActions';
import { Box, List, ListItem, Typography } from '@mui/material';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { Expense } from '../../interfaces/Expenses';

const ExpensePage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [expenses, setExpenses] = useState<Expense[]>([]);

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
                {expenses && expenses.map((expense) => (
                    <ListItem key={expense.id}>
                        <Typography>{`${expense.description} - $${expense.amount}`}</Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ExpensePage;
