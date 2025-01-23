import axios from 'axios';
import { addExpense } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { Expense } from '../interfaces/Expense';

export const addExpenseAction = (newExpense: Expense): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const response = await addExpense(newExpense);

    dispatch({
      type: 'ADD_EXPENSE_SUCCESS',
      payload: response,
    });

    showSuccessToast('New expense added');
  } catch (error) {
    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast(`An unexpected error has occurred`)
    }
  }
};