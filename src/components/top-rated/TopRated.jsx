import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import './TopRated.css'

const TopRated = () => {
  
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const {data: {results}} = (await axios.get('https://localhost:5001/api/top_rated'));
    setMovies(results);
    console.log(movies);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie}
      />
    ))
  )

  
  return (
    <div className="container">
      {renderMovies()}
    </div>
  );
}

export default TopRated;
