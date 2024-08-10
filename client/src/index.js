import React from 'react';
import  ReactDOM  from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render (
    <BrowserRouter>
    <MainRouter />
    </BrowserRouter>
  
);


