import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css/bundle'
import 'swiper/css/autoplay';
import './CustomSlider.css';
import HeroSlide from '../hero-slide/HeroSlide';

const CustomSwiper = ({movies}) => {
  
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
                <SwiperSlide>
                  <HeroSlide
                    movie={movie}/>
                </SwiperSlide>
              )
            })
          }
      </Swiper>
   </div>
  );
}

export default CustomSwiper;
