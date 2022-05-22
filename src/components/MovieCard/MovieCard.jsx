import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({movie}) => {
  
  const AddToWatchList = () => {
    fetch(`https://localhost:5001/api/watchlist/addmovie?id=${movie.id}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      method: "POST",
    })
  }

  return (
    <div>
      <div className='card-container'>
       {movie.poster_path ? <img className='card-content' src={movie.poster_path} alt=''/>
         : null    
       }
       <div className="description">
        <h3 className="card-title">
          {movie.title}
        </h3>
        <div className="subtitle-container">
          <p className='release-date'>
            {movie.release_date.replace(/-/g, '.')}
          </p>
          <div className="overview-container">
            <div className='overview'>{movie.overview.substring(0, 180) + "..."}</div>
          </div>
          <div className="btn-container">
            <button className="card-btn" disabled={!localStorage.getItem('isAuth')}
                onClick={AddToWatchList}>+ Add</button>
            <div className="card-btn">More</div>
          </div>
        </div>
       </div>
      </div>
    </div>
  )
}

export default MovieCard
