import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadCategories } from '../actions/loadCategoriesActions';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadExpenses } from '../actions/loadExpensesActions';

const UserDashboard = () => {
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.user.categoriesList);
    const expenses = useSelector((state: RootState) => state.user.expensesList);

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        loadCategories(dispatch);
        loadExpenses(dispatch);
    }, [dispatch]);
    
    return <Typography>Welcome, {user?.username}!</Typography>;
};

export default UserDashboard;