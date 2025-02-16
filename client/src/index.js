import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/AuthStyle.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './Context/Auth';
import "antd/dist/reset.css";
import { SearchProvider } from './Context/Search';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Wrap the App component with AuthProvider to access the Auth Context
<AuthProvider> 
  <SearchProvider>

  <BrowserRouter> 
  
    <App />
  </BrowserRouter> 
  </SearchProvider>
  </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
