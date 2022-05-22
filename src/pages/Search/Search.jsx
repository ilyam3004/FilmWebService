import React from 'react';
import { useState, useEffect } from 'react';
import Input from '../../components/UI/input/Input';
import Header from '../../components/header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value)
    console.log(e.target.value)
    if(e.target.value.trim()){
      fetch(
        `https://localhost:5001/api/search?title=${e.target.value}`
      )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      })

    } else{
      setResults([]);
    }
  };  
  
  return (
    <div className='search-page'>
      <Header/>
      <div className="input-container">
          <Input 
              type="text" 
              placeholder='Search movie'
              value={query}
              onChange={onChange}/>
      </div>
      <div className="movie-card-precontainer">
        <div className="movie-card-container">
          {results.length > 0 && (
            results.map(movie => (
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

export default Search;
