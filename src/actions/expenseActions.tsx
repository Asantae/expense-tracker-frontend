import { fetchExpenses } from '../services/api';
import { showErrorToast } from '../utils/toastUtil';


export const loadExpenses = async () => {
    try {
        const expenses = await fetchExpenses();
        return expenses;
    } catch (error) {
        showErrorToast('Failed to load expenses.');
        throw error;
    }
};