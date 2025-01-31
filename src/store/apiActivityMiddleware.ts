import { Middleware } from 'redux';
import { Action } from 'redux';

interface ApiState {
  activeRequests: string[];
}

const initialState: ApiState = {
  activeRequests: [],
};

export const apiActivityMiddleware: Middleware = (store) => (next) => (action) => {
  const { type } = action as Action;
  
  const isPending = type.endsWith('/pending');
  const isComplete = type.endsWith('/fulfilled') || type.endsWith('/rejected');

  if (isPending) {
    store.dispatch({ type: 'api/addRequest', payload: type });  
  } else if (isComplete) {
    store.dispatch({ type: 'api/removeRequest', payload: type.replace(/\/(fulfilled|rejected)$/, '/pending') });
  }

  return next(action);
};

export const apiReducer = (state = initialState, action: Action & { payload?: string }) => {
  switch (action.type) {
    case 'api/addRequest':
      return { ...state, activeRequests: [...state.activeRequests, action.payload!] };
    case 'api/removeRequest':
      return {
        ...state,
        activeRequests: state.activeRequests.filter((req) => req !== action.payload),
      };
    default:
      return state;
  }
};