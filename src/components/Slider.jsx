import React, { useState, useEffect} from "react";
import './components.css';
import leftArrow from '../assets/images/left-arrow.png'
import rightArrow from '../assets/images/right-arrow.png'

function Slider({ steps }) {
  const [indexStep, setIndexStep] = useState(0);
  const [step, setStep] = useState(steps[indexStep]);
  
  useEffect(() => {
    setStep(steps[indexStep]);
  }, [steps, step, indexStep])

  const handleLeftButton = () => {
    if (indexStep > 0) {
      setIndexStep(prev => prev - 1);
    } else {
      setIndexStep(steps.length - 1);
    }
  };

  const handleRigthButton = () => {
    if (indexStep < steps.length - 1) {
      setIndexStep(prev => prev + 1);
    } else {
      setIndexStep(0);
    }
  };

  return (
    <section className="section-carousel">
      <button className="buttonL" onClick={handleLeftButton}><img src={leftArrow} alt="left-arrow"/></button>
      <video key={step} loop autoPlay muted playsInline>
      <source className="carousel-image" src={step} alt="people" type="video/mp4" />
      </video>
      <button className="buttonR" onClick={handleRigthButton}><img src={rightArrow} alt="right-arrow"/></button>
    </section>
  )
};

export default Slider;