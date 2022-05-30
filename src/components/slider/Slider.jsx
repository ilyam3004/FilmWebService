import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './Slider.css';
import MovieCard from '../movie-card/MovieCard';
import WatchlistCard from '../movie-card/WatchlistCard';
import { motion } from 'framer-motion';

const Slider = ({movies, title}) => {

  const [width, setWidth] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const carousel = useRef();
  
  useEffect(() => {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
      getWatchlist();
  }, []);

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

  const resultCard = (movie) => {
    if(watchlist.find(item => item.id === movie.id)){
      return (
        <WatchlistCard
            key={movie.id}
            movie={movie}
            change={setWatchlist}
            watchlist={watchlist}/>
      )
    }
    return(
      <MovieCard
        key={movie.id}
        movie={movie}
        change={setWatchlist}
        watchlist={watchlist}/>
    )
  }
  
    return (
      <div>
        <motion.div ref={carousel} className='carousel' whileTap={{ cursor: "grabbing" }}>
          <motion.div className='slider-title'>
              {title}
          </motion.div>
          <motion.div drag="x" 
            dragConstraints={{ right: 0, left: -4270 }}
            className='inner-carousel'>
            {
              movies.map((movie) => {
                console.log(width)
                return (
                  <motion.div className='item' key={movie.id}>
                    {resultCard(movie)}
                  </motion.div>
                );
              })
            }
          </motion.div>
        </motion.div>
      </div>
    )
}

export default Slider
