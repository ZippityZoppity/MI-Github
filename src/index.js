import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import MainApp from './components/MainApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);