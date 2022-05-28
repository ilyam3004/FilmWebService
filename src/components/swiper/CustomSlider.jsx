import React from 'react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import '../../../node_modules/swiper/swiper-bundle.esm'
import './CustomSlider.css';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const CustomSlider = () => {

  return (
    <React.Fragment>
      <Swiper tag="section" wrapperTag='ul' id="main" navigation pagination>
      </Swiper>
    </React.Fragment>
  );
}

export default CustomSlider
