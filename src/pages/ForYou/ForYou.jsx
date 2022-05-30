import React, { useEffect, useState, useSyncExternalStore } from 'react';
import Header from '../../components/header/Header';
import CustomSwiper from '../../components/swiper/CustomSwiper';
import './ForYou.css';

const ForYou = () => {

  const [recomendations, setRecomendations] = useState([]);

  const getRecomendations = () => {
    if(localStorage.getItem('isAuth')){
      fetch(`https://localhost:4001/api/recomendations?token=${localStorage.getItem('token')}`,
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
    } else if (recomendations.length === 0) {
        return (
          <div className='rec-error-container'>
            <h2>Oh no! Your watchlist is empty😟<br/>Please add movies to watchlist and we will select a list of films based on your interests😄</h2>
          </div>
        )
    } else {
      return (
          <CustomSwiper
            movies={recomendations}></CustomSwiper>
      )
    }
  }

  useEffect(() => {
    getRecomendations();
  }, [])

  return (
    <div className='forYou-page'>
        <Header/>
        {checkRecomendationsErrors()}
    </div>
  )
}

export default ForYou;
