import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'


ReactDOM.render(
  <BrowserRouter>
    <Routes>
       <Route index element={<Home />} /> 
       <Route path={'sign-in'} element={<SignIn />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


