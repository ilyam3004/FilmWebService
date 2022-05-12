import React from 'react';

const ResultCard = ({movie}) => {
  return (
    <div className='result-card'>
      <div className="poster-wrapper">
        {movie.poster_path ? (
            <img
              src={movie.poster_path}
              alt={`${movie.title} Poster`}/>
        ) : (
          <div className="filler-poster"></div>
        )
      }
      </div>
      <div className="info">
          <div className="header">
              <h3 className="title">{movie.title}</h3>
              <h4 className="release-date">
              {movie.release_date ? movie.release_date.substring(0, 4) : "-"}</h4>
          </div>
          <div className="controls">
              <button className="btn">Add to Watchlist</button>
          </div>
      </div>
    </div>
  )
}

export default ResultCard
