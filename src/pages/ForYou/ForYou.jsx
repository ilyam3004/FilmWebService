import React, { useEffect, useState, useSyncExternalStore } from 'react';
import Header from '../../components/header/Header';
import CustomSwiper from '../../components/swiper/CustomSwiper';
import './ForYou.css';

const ForYou = () => {

  const [watchlist, setWatchlist] = useState([])

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

  const [recomendations, setRecomendations] = useState([]);

  const getRecomendations = () => {
    if(localStorage.getItem('isAuth')){
      fetch(`https://recommendations-web-api.herokuapp.com/api/recomendations?token=${localStorage.getItem('token')}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setRecomendations(data.results);
          console.log(data.results)
        } else {
          setRecomendations([]);
        }
      })
    }
  }

  const checkRecomendationsErrors = () => {
    if(!localStorage.getItem('isAuth')){
      return (
        <div className='rec-error-container'>
          <h2>You are unauthorised  (•︵•)</h2>
        </div>
      )
    } else if (recomendations.length === 0 && watchlist.length === 0) {
        return (
          <div className='rec-error-container'>
            <h2>Oh no! Your watchlist is empty😟<br/>Please add movies to watchlist and we will select a list of films based on your interests😄</h2>
          </div>
        )
    } else if (recomendations.length === 0 && watchlist.length > 0) {
      return (
        <div className='rec-error-container'>
          <h2>Oh no! Unfortunately we can't select the films based on your interest😟<br/>Please add more movies to watchlist and we will try again to select a list of movies😄</h2>
        </div>
      )
    } else {
      return (
          <CustomSwiper
            movies={recomendations}
            watchlist={watchlist}
            change={setWatchlist}/>
      )
    }
  }

  useEffect(() => {
    getWatchlist();
    getRecomendations();
    console.log(watchlist)
    console.log(recomendations)
  }, [])

  return (
    <div className='forYou-page'>
        <Header/>
        {checkRecomendationsErrors()}
    </div>
  )
}

export default ForYou;
