import React, { useEffect, useState } from 'react';
import { loadExpenses } from '../actions/expenseActions';
import { Box, List, ListItem, Typography } from '@mui/material';

interface IExpense {
    id: number;
    amount: number;
    description: string;
    date: string;
}

const ExpensePage: React.FC = () => {
    const [expenses, setExpenses] = useState<IExpense[]>([]);

    useEffect(() => {
        const getExpenses = async () => {
            const expensesData = await loadExpenses();
            setExpenses(expensesData);
        };
        getExpenses();
    }, []);

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
