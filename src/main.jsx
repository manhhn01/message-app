import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './store';
import Modal from './components/Modal';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Modal />
      <Toaster
        position="top-center"
        containerStyle={{
          fontSize: '1.125rem',
          padding: '16px 24px',
        }}
      />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
