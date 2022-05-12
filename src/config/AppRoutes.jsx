import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';
import Watchlist from '../pages/Watchlist';
import Watched from '../pages/Watched';
import Add from '../pages/Add';
import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Watchlist/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/watched" element={<Watched/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes;
