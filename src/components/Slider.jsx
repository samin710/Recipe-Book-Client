import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirst = currentIndex === 0;
    setCurrentIndex(isFirst ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    const isLast = currentIndex === images.length - 1;
    setCurrentIndex(isLast ? 0 : currentIndex + 1);
  };

  if (!images || images.length === 0) return <p>No images to show</p>;

  return (
    <div className="relative w-full md:w-3xl lg:w-5xl mx-auto mt-6">
      <div className="h-64 md:h-110 overflow-hidden rounded-lg shadow">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].name || `image-${currentIndex}`}
          className="w-full h-full object-cover"
        />
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-2 rounded-full shadow text-gray-700 hover:bg-gray-100"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-2 rounded-full shadow text-gray-700 hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentIndex === idx ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
