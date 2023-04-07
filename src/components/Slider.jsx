import React, { useState, useRef, useEffect } from "react";
import './components.css';

function Slider({ images }) {
   const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const trackRef = useRef(null);
  const minDragWidth = 50;

  const handleMouseDown = (event) => {
    event.preventDefault();
    setDragging(true);
    setStartX(event.pageX);
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    setDragging(true);
    setStartX(event.touches[0].pageX);
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      const dx = event.pageX - startX;
      if (dx < -minDragWidth) {
        setActiveIndex(Math.min(activeIndex + 1, images.length - 1));
        setStartX(startX - minDragWidth);
      } else if (dx > minDragWidth) {
        setActiveIndex(Math.max(activeIndex - 1, 0));
        setStartX(startX + minDragWidth);
      }
    }
  };

  const handleTouchMove = (event) => {
    if (dragging) {
      const dx = event.touches[0].pageX - startX;
      if (dx < -minDragWidth) {
        setActiveIndex(Math.min(activeIndex + 1, images.length - 1));
        setStartX(startX - minDragWidth);
      } else if (dx > minDragWidth) {
        setActiveIndex(Math.max(activeIndex - 1, 0));
        setStartX(startX + minDragWidth);
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove, { passive: false });
      document.addEventListener("mouseup", handleMouseUp, { passive: false });
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd, { passive: false });
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }
  }, [dragging]);

  return (
    <div
      ref={trackRef}
      className="slider-track"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        className="slider-images"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slider ${index}`}
            className="slider-image"
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;