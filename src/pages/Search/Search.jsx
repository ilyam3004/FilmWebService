import React from 'react';
import { useState, useEffect } from 'react';
import Input from '../../components/ui/input/Input';
import Header from '../../components/header/Header';
import MovieCard from '../../components/movie-card/MovieCard';
import './Search.css';
import WatchlistCard from '../../components/movie-card/WatchlistCard';

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const getWatchlist = () => {
    if(localStorage.getItem('isAuth')){
      fetch(`https://movie-web-api-service.herokuapp.com/api/watchlist`,
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

  useEffect(() => {
    getWatchlist();
  },[])

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value)

    if(e.target.value.trim()){
      fetch(
        `https://movie-web-api-service.herokuapp.com/api/search?title=${e.target.value}`
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

  const checkState = () => {
    if(query.length !== 0 && results.length !== 0){
      return (
        results.map(movie => (
          resultCard(movie)
        ))
      )
    } else if (results.length === 0 && query.length < 1){
      return(
        <div className='error-container'>
          <h2>👆Start typing to watch results👆</h2>
        </div>
      )
    } else {
      return(
        <div className='error-container'>
          <h2>¯\_(ツ)_/¯</h2>
        </div>
      )
    }
  }
  
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
          {checkState()}
        </div>
      </div>
    </div>
  )
}

export default Search;
