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
    fetch(`https://localhost:5001/api/popular`,
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
    fetch(`https://localhost:5001/api/top_rated`,
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
    fetch(`https://localhost:5001/api/upcoming`,
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
    fetch(`https://localhost:5001/api/trending/week`,
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
    fetch(`https://localhost:5001/api/trending/day`,
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

  return (
    <div className='home-page'>
      <Header/>
      <CustomSwiper
        movies={popular}  
      />
      <div className="empty-container"/>
      <Slider
        title="Top rated"
        movies={topRated}
      />
      <Slider
        title="Day trending"
        movies={dayTrending}
      />
      <Slider
        title="Week trending"
        movies={weekTrending}
      />
      <Slider
        title="Coming soon"
        movies={upComing}
      />
    </div>
  )
}

export default Home;
