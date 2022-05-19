import React from 'react';
import './MovieCard.css';

const MovieCard = ({movie}) => {
  return (
    <div className='movie-card'>
        {movie.poster_path ? <img className='movie-card' src={movie.poster_path} alt=''/>
            : null    
        }
        <h5 className='movie-title'>{movie.title}</h5>
    </div>
  )
}

export default MovieCard
