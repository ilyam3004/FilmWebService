import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './Slider.css';
import MovieCard from '../movie-card/MovieCard';
import { motion } from 'framer-motion';

const Slider = ({movies, title}) => {

    const [width, setWidth] = useState(0);
    const carousel = useRef();
    
    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, []);
  
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
                    <MovieCard movie={movie}/>
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
