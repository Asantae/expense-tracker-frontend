import axios from 'axios';
import { addExpense } from '../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { showErrorToast, showSuccessToast } from '../utils/toastUtil';
import { Expense } from '../interfaces/Expense';

const createApiAction = async (
  dispatch: any,
  actionType: string,
  apiCall: () => Promise<any>,
  successCallback?: (response: any) => void,
  errorCallback?: (error: any) => void
) => {
  try {
    dispatch({ type: `${actionType}/pending` });

    const response = await apiCall();

    dispatch({
      type: `${actionType}/fulfilled`,
      payload: response.expense,
    });

    if (successCallback) successCallback(response);
  } catch (error) {
    dispatch({
      type: `${actionType}/rejected`,
      payload: error,
    });

    if (errorCallback) errorCallback(error);
  }
};