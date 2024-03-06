import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CustomerProvider } from './context/CustomerContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CustomerProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </CustomerProvider>
  </BrowserRouter>
)
