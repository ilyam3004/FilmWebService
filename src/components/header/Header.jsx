import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const navRef = useRef();

  const [color, setColor] = useState(false)
  const changeColor = () => {
    if(window.scrollY >= 200) {
      setColor(true);
    } else {
      setColor(false);
    }
  }

  window.addEventListener('scroll', changeColor);
  return (
      <div className={ color ? 'header header-bg' : 'header'}>
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
