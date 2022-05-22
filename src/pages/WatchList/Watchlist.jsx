import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import './WatchList.css';

const Watchlist = () => {

  const [watchlist, setWatchlist] = useState([]);

  const getWatchlist = () => {
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
  
  useEffect(() => {
    getWatchlist();
  },[])

  return (
    <div>
      <Header/>
      <div className="movie-card-precontainer">
        <div className="movie-card-container">
          {watchlist.length > 0 && (
            watchlist.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Watchlist;
