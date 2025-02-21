import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div align="center">
          <img src={require('./assets/macbook.png').default} style={{ width: 'min(100%,400px)' }} />
        </div>
        <div align="center">
          <img src={require('./assets/ipad.png').default} style={{ width: 'min(100%,400px)' }} />
        </div>
        <div align="center">
          <img src={require('./assets/iphone.png').default} style={{ width: 'min(100%,400px)' }} />
        </div>
        <div align="center">
          <img src={require('./assets/applewatch.png').default} style={{ width: 'min(100%,400px)' }} />
        </div>
        <div align="center">
          <img src={require('./assets/airpods.pro.png').default} style={{ width: 'min(100%,400px)' }} />
        </div>
        <div align="center">
          <img src={require('./assets/airpods.max.png').default} style={{ width: 'min(100%,400px)' }} />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
