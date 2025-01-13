import React, { useEffect, useState } from 'react';
import { loadExpenses } from '../actions/expenseActions';
import { Box, List, ListItem, Typography } from '@mui/material';

interface Expense {
    id: number;
    amount: number;
    description: string;
    date: string;
}

const ExpensePage: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const expensesData = await loadExpenses();
                setExpenses(expensesData);
            } catch (err) {
            }
        };
        getExpenses();
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Expenses
            </Typography>
            <List>
                {expenses.map((expense) => (
                    <ListItem key={expense.id}>
                        <Typography>{`${expense.description} - $${expense.amount}`}</Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ExpensePage;
