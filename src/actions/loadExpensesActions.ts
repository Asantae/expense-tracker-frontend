import { Expense } from '../../interfaces/Expense';
import { getExpenses } from '../services/api';
import { setExpenses } from '../store/userSlice';
import { showErrorToast } from '../utils/toastUtil';

export const loadExpenses = async (dispatch: any) => {
    try {
        const expensesList: Expense[] = await getExpenses();

        dispatch(setExpenses({ expenses: expensesList }))

        return expensesList;
    } catch (error) {
        showErrorToast('Failed to load expenses');
        return [];
    }
};