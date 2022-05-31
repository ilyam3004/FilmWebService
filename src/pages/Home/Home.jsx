import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import './Home.css';
import Slider from '../../components/slider/Slider';
import CustomSwiper from '../../components/swiper/CustomSwiper';

const Home = () => {
  
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [weekTrending, setWeekTrending] = useState([]);
  const [dayTrending, setDayTrending] = useState([]);

  const getPopular = () => {
    fetch(`https://movie-web-api-service.herokuapp.com/api/popular`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setPopular(data.results);
        } else {
          setPopular([]);
        }
      })
  }

  const getTopRated = () => {
    fetch(`https://movie-web-api-service.herokuapp.com/api/top_rated`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setTopRated(data.results);
        } else {
          setTopRated([]);
        }
      })
  }
  
  const getUpComing = () => {
    fetch(`https://movie-web-api-service.herokuapp.com/api/upcoming`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setUpComing(data.results);
        } else {
          setUpComing([]);
        }
      })
  }

  const getWeekTrending = () => {
    fetch(`https://movie-web-api-service.herokuapp.com/api/trending/week`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setWeekTrending(data.results);
        } else {
          setWeekTrending([]);
        }
      })
  }

  const getDayTrending = () => {
    fetch(`https://movie-web-api-service.herokuapp.com/api/trending/day`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setDayTrending(data.results);
        } else {
          setDayTrending([]);
        }
      })
  }

  useEffect(() => {
    getPopular();
    getTopRated();
    getUpComing();
    getWeekTrending();
    getDayTrending();
  }, [])

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

  useEffect(() => {
    getWatchlist();
  }, [])

  return (
    <div className='home-page'>
      <Header/>
      <CustomSwiper
        movies={popular}
        watchlist = {watchlist}
        change={setWatchlist} 
      />
      <div className="empty-container"/>
      <Slider
        title="Top rated"
        movies={topRated}
        watchlist={watchlist}
        change={setWatchlist}
      />
      <Slider
        title="Day trending"
        movies={dayTrending}
        watchlist={watchlist}
        change={setWatchlist}
      />
      <Slider
        title="Week trending"
        movies={weekTrending}
        watchlist={watchlist}
        change={setWatchlist}
      />
      <Slider
        title="Coming soon"
        movies={upComing}
        watchlist={watchlist}
        change={setWatchlist}
      />
    </div>
  )
}

export default Home;
