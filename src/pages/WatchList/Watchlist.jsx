import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import WatchlistCard from '../../components/MovieCard/WatchlistCard';
import './Watchlist.css';

const Watchlist = () => {
  
  const [watchlist, setWatchlist] = useState([]);

  const getWatchlist = () => {
    if(localStorage.getItem('isAuth')){
      fetch(`https://localhost:5001/api/watchlist`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setWatchlist(data.results);
        } else {
          setWatchlist([]);
        }
      })
    }
  }

  const checkWatchListErrors = () => {
    if(!localStorage.getItem('isAuth')){
      return (
        <div className='error-container'>
          <h2>You are unauthorised  (•︵•)</h2>
        </div>
      )
    } else if (watchlist.length === 0) {
        return (
          <div className='error-container'>
            <h2>Your watchlist is empty (•︵•)</h2>
          </div>
        )
    } else {
      return (
        watchlist.map(movie => (
          <WatchlistCard
            key={movie.id}
            movie={movie}
            change={setWatchlist}
            watchlist={watchlist}
          />
        ))
      )
    }
  }
  
  
  useEffect(() => {
    getWatchlist();
  },[])

  return (
    <div>
      <Header/>
      <div className="watchlist-page">
        <div className='watchlist-precontainer'>
        <h1 className='title'>Your watchlist</h1>
          <div className="watchlist-container">
            {checkWatchListErrors()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Watchlist;
