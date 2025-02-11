import axios from 'axios';
import { editExpense } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { Expense } from '../interfaces/Expense';

export const editExpenseAction = (editedExpense: Expense): ThunkAction<Promise<Expense | null>, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch({ type: 'user/editExpenseInList/pending'});

    const response = await editExpense(editedExpense);

    dispatch({
      type: 'user/editExpenseInList',
      payload: response.expense,
    });
    
    dispatch({ type: 'user/editExpenseInList/fulfilled' });

    showSuccessToast('Expense successfully updated');
    return response.expense;
  } catch (error) {
    dispatch({
      type: 'user/editExpenseInList/rejected',
      payload: error,
    });

    if(axios.isAxiosError(error) && error.response){
      showErrorToast(`${error.response?.data}`);
    } else {
      showErrorToast(`An unexpected error has occurred`)
    }
  }
};