import axios from 'axios';
import { deleteExpenses } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';

export const deleteExpensesAction = (expensesToDelete: string[]): ThunkAction<Promise<string | null>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch({ type: 'user/deleteExpenseInList/pending'});
    
    const response = await deleteExpenses(expensesToDelete);

    dispatch({
      type: 'user/deleteExpenseInList',
      payload: response.deletedExpenses,
    });
    
    dispatch({ type: 'user/deleteExpenseInList/fulfilled' });

    showSuccessToast('Expense(s) successfully deleted');
    return response;
  } catch (error) {
    dispatch({
      type: 'user/deleteExpenseInList/rejected',
      payload: error,
    });

    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast(`An unexpected error has occurred`)
    }
  }
};