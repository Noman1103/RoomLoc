import React, { useEffect, useState } from 'react';
import '../styles/home/Carousel.css';

const images = [
  'img/Carousel/01.png',
  'img/Carousel/02.png',
  'img/Carousel/03.png',
  'img/Carousel/04.png',
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
        <div className="carousel-indicator">
            <span>Découvrez nos</span>
            <p>logements à louer</p>
        </div>
        <div className="carousel">
            <div className="carousel__inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                <div className="carousel__item" key={index}>
                    <img src={image} alt={`Slide ${index}`} />
                </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default Carousel;