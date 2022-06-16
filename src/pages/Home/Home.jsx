import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import './Home.css';
import Slider from '../../components/slider/Slider';
import CustomSwiper from '../../components/swiper/CustomSwiper';
import { SyncLoader } from 'react-spinners';

const Home = () => {
  
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [weekTrending, setWeekTrending] = useState([]);
  const [dayTrending, setDayTrending] = useState([]);
  const [loading, setLoading] = useState(true)

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
          setLoading(false);
        } else {
          setPopular([]);
          setLoading(false);
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
          setLoading(false);
        } else {
          setTopRated([]);
          setLoading(false);
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
          setLoading(false);
        } else {
          setUpComing([]);
          setLoading(false);
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
          setLoading(false);
        } else {
          setWeekTrending([]);
          setLoading(false);
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
          setLoading(false);
        } else {
          setDayTrending([]);
          setLoading(false);
        }
      })
  }

  useEffect(() => {
    getPopular();
    getTopRated();
    getUpComing();
    getWeekTrending();
    getDayTrending();
    getWatchlist();
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
          setLoading(false);
        } else {
          setWatchlist([]);
          setLoading(false);
        }
      })
    }
  }

  return (
    <div className='home-page'>
      <Header/>
      <div>
        {
          loading 
          ? (<div className='home-error-container'>
              <SyncLoader loading={loading} color={"#fff"}></SyncLoader>``
            </div>)
          : (<div>
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
            </div>)
          }
      </div>
    </div>
  )
}

export default Home;
