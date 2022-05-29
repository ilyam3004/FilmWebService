import React from 'react';
import './HeroSlide.css';

const HeroSlide = ({movie}) => {
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
                <button className='hero-slider-item-add-btn'>
                  Add To WatchList
                </button>
                <button className='hero-slider-item-more-btn'>
                  More
                </button>
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
