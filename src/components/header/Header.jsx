import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const navRef = useRef();

  return (
      <div className='header'>
        <nav ref={navRef}>
          <h3 className='logo'>Movies</h3>
          <ul className='link-list'>
          <li className='nav-link'>
              <Link to='/'>
                Home
              </Link>
            </li>
            <li className='nav-link'>
              <Link to='/foryou'>
                For you
              </Link> 
            </li>
            <li className='nav-link'>
              <Link to='/search'>
                Search
              </Link>
            </li>
            <li className='nav-link'>
              <Link to='/watchlist'>
                WatchList
              </Link>
            </li>
          </ul>
          {localStorage.getItem('isAuth') ? 
            <Link to='/signin' 
            className='login-btn'
            onClick={() => localStorage.clear()}>
              Log out
            </Link>
           : <Link to='/signin' 
              className='login-btn'>
                Login
            </Link>
          } 
        </nav>
      </div>
  )
}

export default Header;
