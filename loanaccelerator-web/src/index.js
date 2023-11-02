import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { ApiContextProvider } from './apicontext/ApiContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiContextProvider>
    <App />
    </ApiContextProvider>
  </React.StrictMode>
);
  
reportWebVitals();
