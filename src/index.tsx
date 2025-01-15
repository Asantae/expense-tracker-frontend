import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
  <Provider store={store}>
      <BrowserRouter basename='/'>
        <App />
      </BrowserRouter>
  </Provider>
  </React.StrictMode>
);

