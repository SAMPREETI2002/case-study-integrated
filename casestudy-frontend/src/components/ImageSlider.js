import React, { useState, useEffect } from 'react';
import './styles/ImageSlider.css';  // Assuming ImageSlider.css is in the same folder as ImageSlider.js
import img1 from '../assets/images/image1.jpg'; // Correct path to the images folder
import img2 from '../assets/images/image2.jpg'; // Correct path to the images folder
import img3 from '../assets/images/image3.jpg'
const ImageSlider = () => {
  const images = [img1, img2 , img3]; // Array of images
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(slideInterval); // Clean up interval on component unmount
  }, [images.length]);

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} className="slider-image" />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
