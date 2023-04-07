import React, { useState, useRef, useEffect } from "react";
import './components.css';

function Slider({ images }) {
const randomNum = Math.floor(Math.random() * 4);
  const [indexImg, setIndexImg] = useState(randomNum);
  const [image, setImage] = useState(images[indexImg]);
  
  useEffect(() => {
    setImage(images[indexImg])
  }, [images, indexImg])

  const handleLeftButton = () => {
    if (indexImg > 0) {
      setIndexImg(prev => prev - 1)
    } else {
      setIndexImg(images.length - 1)
    }
  };

  const handleRigthButton = () => {
    if (indexImg < images.length - 1) {
      setIndexImg(prev => prev + 1)
    } else {
      setIndexImg(0)
    }
  };

  return (
    <section className="section-carousel">
      <button className="buttonL" onClick={handleLeftButton}>◀︎</button>
      <img className="carousel-image" src={image} alt="people" style={{width: "100%"}} />
      <button className="buttonR" onClick={handleRigthButton}>▶︎</button>
    </section>
  )
}

export default Slider;