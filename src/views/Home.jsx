import React from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import step0 from '../assets/images/step-0-l.mp4';
import step1 from '../assets/images/step-1-l.mp4';
import step2 from '../assets/images/step-2-l.mp4';
import step3 from '../assets/images/step-3-l.mp4';
import step4 from '../assets/images/step-4-l.mp4';

export default function Home() {
  return (
    <div className="home">
      <Navbar backGround="true" color="blue" />
      <div className="main-container">
        <Slider steps={[step0, step1, step2, step3, step4]} />
      </div>
      <Footer color="yellow" size="70px" />
    </div>
  );
}
