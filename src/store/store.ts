import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import { thunk, ThunkDispatch } from 'redux-thunk';
import userReducer from '../store/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export default store;
