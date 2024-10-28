import React, { useState } from "react";

const Slideshow = () => {
  const images = [
    "client/assets/images/events_page/SASE1.jpg",
    "client/assets/images/events_page/SASE2.jpg",
    "client/assets/images/events_page/SASE3.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "35%",
          left: "280px",
          padding: "5px",
          fontSize: "20px",
        }}
        onClick={prevSlide}
      >
        {"<"}
      </button>
      <div
        style={{
          display: "inline-flex",
          marginLeft: "350px",
          marginRight: "230px",
        }}
      >
        <img
          src={images[currentIndex]}
          alt="slide"
          style={{
            width: "80%",
            height: "auto",
          }}
        />
      </div>
      <button
        style={{
          position: "absolute",
          top: "35%",
          right: "325px",
          padding: "10px",
          fontSize: "20px",
        }}
        onClick={nextSlide}
      >
        {">"}
      </button>
    </div>
  );
};

export default Slideshow;
