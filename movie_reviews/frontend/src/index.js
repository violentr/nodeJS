import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // 1. Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
// <BrowserRouter> needs to be used around the App component, whenever you want to use routing
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>
);

