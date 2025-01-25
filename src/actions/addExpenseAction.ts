import axios from 'axios';
import { addExpense } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { Expense } from '../interfaces/Expense';

export const addExpenseAction = (newExpense: Expense): ThunkAction<Promise<Expense | null>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch({ type: 'user/addExpenseToList/pending'});

    const response = await addExpense(newExpense);

    dispatch({
      type: 'user/addExpenseToList',
      payload: response.expense,
    });
    
    dispatch({ type: 'user/addExpenseToList/fulfilled' });

    showSuccessToast('New expense added');
    return response.expense;
  } catch (error) {
    dispatch({
      type: 'user/addExpenseToList/rejected',
      payload: error,
    });

    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast(`An unexpected error has occurred`)
    }
  }
};