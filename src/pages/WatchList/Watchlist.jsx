import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import WatchlistCard from '../../components/movie-card/WatchlistCard';
import SyncLoader from "react-spinners/SyncLoader";
import './WatchlistStyle.css';

const Watchlist = () => {
  
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  const getWatchlist = () => {
    if(localStorage.getItem('isAuth')){
      fetch(`https://movie-web-api-service.herokuapp.com/api/watchlist`,
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
          setLoading(false)
        } else {
          setWatchlist([]);
          setLoading(false)
        }
      })
    } else {
      setLoading(false)
    }
  }

  const checkWatchListErrors = () => {
    if(!localStorage.getItem('isAuth')){
      return (
        <div className='error-container'>
          <h2>You are unauthorised  (•︵•)</h2>
        </div>
      )
    } else if (watchlist.length === 0 && !loading) {
        return (
          <div className='error-container'>
            <h2>Your watchlist is empty (•︵•)</h2>
          </div>
        )
    } else if(!loading){
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
          <div className="error-container">
            <SyncLoader color={"#fff"} size={15} loading={loading}/>
          </div>
            {
               checkWatchListErrors()
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Watchlist;
