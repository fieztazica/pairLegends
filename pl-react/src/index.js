import 'bootstrap/dist/css/bootstrap.css';
//import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
