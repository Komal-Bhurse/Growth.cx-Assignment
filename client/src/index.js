import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import WebScrap from './context_api/WebScrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <WebScrap Children={<App />}/>
    </BrowserRouter>
  </React.StrictMode>
);
