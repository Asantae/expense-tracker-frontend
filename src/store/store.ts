import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer, // The root reducer
  applyMiddleware(thunk) // Apply thunk middleware for async actions
);

export default store;
