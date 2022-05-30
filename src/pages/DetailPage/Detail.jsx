import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import './Detail.css'
import YouTube, { YouTubeProps } from 'react-youtube';
import HeroSlide from '../../components/hero-slide/HeroSlide';

const Detail = () => {

  const {id} = useParams();

  const [movie, setMovie] = useState({});
  const [trailers, setTrailers] = useState([]);

  const [watchlist, setWatchlist] = useState([])

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

  const getMovie = () => {
    fetch(`https://localhost:5001/api/movie?id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setMovie(data)
          setTrailers(data.trailers);
          console.log(data.trailers)
        }
      })
  }

  useEffect(() => {
    getWatchlist();
    getMovie();
  }, [])

  const onPlayerReady  = (event) => {
    event.target.pauseVideo();
  }

  const opts = {
    height: '505',
    width: '900',
    playerVars: {
      autoplay: false,
    },
  };

  const renderTrailers = () => {
    const youTubeTrailers = trailers.filter(tr => tr.site === "YouTube").slice(0, 15)
    if(youTubeTrailers.length > 0){
      return(
        youTubeTrailers.map((trailer, i) => (
          <div key={trailer.id}>
            <h2 className='video-title'>{trailer.name}</h2>
            <YouTube
              videoId={trailer.key} 
              opts={opts} 
              onPause={onPlayerReady}/>
          </div>
        ))
      )
      
    } else {
      return (
        <h1>No trailers</h1>
      )
    }
  }
  return (
    <div className='detail-page'>
      <Header/>
      <HeroSlide
        movie={movie}
        watchlist={watchlist}
        change={setWatchlist}
        isDetail={true}/>
      <div className='trailer-container'>
        {renderTrailers()}
      </div>
    </div>
  )
}

export default Detail
