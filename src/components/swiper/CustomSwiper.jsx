import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css/bundle'
import 'swiper/css/autoplay';
import './CustomSwiper.css';
import HeroSlide from '../hero-slide/HeroSlide';

const CustomSwiper = ({movies, watchlist, change}) => {

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
                    change={change}
                    isDetail={false}/>
                </SwiperSlide>
              )
            })
          }
      </Swiper>
   </div>
  );
}

export default CustomSwiper;
