import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Watchlist from '../pages/WatchList/Watchlist';
import Home from '../pages/Home/Home';
import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';
import ForYou from '../pages/ForYou/ForYou';
import Search from '../pages/Search/Search';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/watchlist" element={<Watchlist/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/foryou" element={<ForYou/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes;
