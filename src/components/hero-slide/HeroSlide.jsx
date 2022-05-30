import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlide.css';

const HeroSlide = ({movie, watchlist, change}) => {

  const AddToWatchList = () => {
    fetch(`https://localhost:5001/api/watchlist/addmovie?id=${movie.id}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      method: "POST",
    })
    change(watchlist.filter((item) => item.id !== movie.id));
  }
  
  const RemoveFromWatchList = () => {
    fetch(`https://localhost:5001/api/watchlist/delete?id=${movie.id}`,
    {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      method: "DELETE",
    })
    change(watchlist.filter((item) => item.id !== movie.id));
  }


  const resultButton = () => {
    if(watchlist.find(item => item.id === movie.id)){
      return (
        <button className='hero-slider-item-add-btn'
                disabled={!localStorage.getItem('isAuth')}
                onClick={RemoveFromWatchList()}>
             Remove
        </button>
      )
    }
    return(
      <button className='hero-slider-item-add-btn'
              disabled={!localStorage.getItem('isAuth')}
              onClick={AddToWatchList()}>
              Add To Watchlist
      </button>
    )
  }
  return (
    <div className="hero-slide-item" style={{ 
        backgroundImage: `url("${movie.backdrop_path}")`}}>
        <div className='hero-slide-item-container'>
          <div className="hero-slide-item-content-container">
            <div className="hero-slide-item-content-info">
              <h2 className="hero-slide-item-title">
                {movie.title}
              </h2> 
              <div className="hero-slide-item-overview">
                {movie.overview}
              <div className="hero-slide-item-btns">
                  {resultButton()}
                  <Link to="/search" className='hero-slider-item-more-btn'>More</Link>
              </div>
              </div>
            </div>
              <img src={movie.poster_path} className="hero-slide-item-content-poster"/>
          </div> 
        </div> 
    </div>
  )
}

export default HeroSlide;
