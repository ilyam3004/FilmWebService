import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes} from 'react-icons/fa';
import '../header/header.css'

const Header = () => {
  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle('responsive_nav');
  }

  return (
      <div className='header'>
        <nav ref={navRef}>
          <h3 className='logo'>Movies</h3>
          <ul className='link-list'>
            <li className='nav-link'>
              <Link to='/foryou'>
                For you
              </Link> 
            </li>
            <li className='nav-link'>
              <Link to='/upcoming'>
                UpComing
              </Link>
            </li>
            <li className='nav-link'>
              <Link to='/watched'>
                Watched
              </Link>
            </li>
            <li className='nav-link'>
              <Link to='/watchlist'>
                WatchList
              </Link>
            </li>
          </ul>
          <Link to='/signin' className='login-btn'>Login</Link>
        </nav>
      </div>
  )
}

export default Header;
