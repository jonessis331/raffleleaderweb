// src/components/CarouselList.js
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselList = ({ title, items }) => {
  return (
    <div className="carousel-container">
      <h3>{title}</h3>
      <Carousel responsive={{}}>
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            {item}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselList;
