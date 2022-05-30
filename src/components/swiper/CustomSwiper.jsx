import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css/bundle'
import 'swiper/css/autoplay';
import './CustomSlider.css';
import HeroSlide from '../hero-slide/HeroSlide';

const CustomSwiper = ({movies}) => {

  const [watchlist, setWatchlist] = useState([]);

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

  useEffect(() => {
    getWatchlist();
  }, [])
  
  return (
   <div className='swiper-container'>
     <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000}}
        pagination={{clickable: true}}>
          {
            movies.map((movie) => {
              return(
                <SwiperSlide key={movie.id}>
                  <HeroSlide
                    movie={movie}
                    watchlist={watchlist}
                    change={setWatchlist}/>
                </SwiperSlide>
              )
            })
          }
      </Swiper>
   </div>
  );
}

export default CustomSwiper;
